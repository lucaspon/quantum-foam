// distribution with skewness function
function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0)
        num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range

    else {
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}


// Global object to hold variables
let sketchData;
let colorIndex = 0;
let frameCounter = 0;

let isLooping = true;
function toggleLoop() {
    if (isLooping) {
        noLoop();
    } else {
        loop();
    }
    isLooping = !isLooping; // Toggle the state
}

function setup() {
    const canvasDiv = document.getElementById('canvas');
    const width = canvasDiv.offsetWidth;
    const height = canvasDiv.offsetHeight;

    let canvas = createCanvas(width, height);
    canvas.parent('canvas');

    let bg = color(Math.trunc(random(0, 10)), Math.trunc(random(0, 10)), Math.trunc(random(0, 10)));
    background(bg);

    sketchData = {
        width: width,
        height: height,
        palette: [
            color(112, 132, 68), // light green
            color(58, 90, 45), // dark green
            color(252, 188, 25), // light yellow
            color(251, 215, 0), // dark yellow
            color(183, 37, 46), // red
            color(248, 147, 29), // light orange
            color(223, 103, 39), // dark orange
            color(255, 255, 255), // white
            // color(42, 21, 138), // dark purple
            // color(16, 35, 87), // dark blue
        ],
        rmax: 150
    };

    document.getElementById('toggleLoopButton').addEventListener('click', toggleLoop);
    // noLoop();

}

function draw() {
    if (frameCounter % 60 === 0) { // Change color every 60 frames (1 second at 60 fps)
        colorIndex = (colorIndex + 1) % sketchData.palette.length;
    }
    frameCounter++;

    noStroke();
    drawSketch(sketchData, sketchData.palette[colorIndex]);
}

function drawSketch(data, currentColor) {
    let numrows = Math.trunc(random(25, data.rmax)); // # of rows
    let numcols = numrows + Math.trunc(random(-4, 4)); // # of cols
    let p = [];
    let cl = [];
    let n = 1; // As per original code, n is always 1

    // console.log('rows: ' + numrows)
    // console.log('cols: ' + numcols)

    // for (let i = 0; i <= n; i++) {
    //     cl[i] = random(data.palette);
    // }

    // define shape position matrix
    for (let col = 0; col <= numcols; col++) {
        p[col] = [];
        for (let row = 0; row <= numrows; row++) {
            p[col][row] = Math.trunc(random(0.3, 1.3)); // chance of a position having a circle
        }
    }

    // draw shapes
    for (let col = 0; col < numcols - 2; col++) {
        for (let row = 0; row < numrows - 2; row++) {
            if (p[col][row] === 1) {
                // define shape color
                let color = currentColor;

                let dist = Math.trunc(random(0, 1.05)); // choose transparency distribution skewness
                let alpha;
                if (dist === 1) {
                    alpha = randn_bm(1, 255, 0.4); // closer to 255
                } else {
                    alpha = randn_bm(1, 255, 3);  // closer to 1
                }
                color.setAlpha(alpha); // choose transparency

                fill(color);
                let x = data.width / (numcols - 1) * (col + 1);
                let y = data.height / (numrows - 1) * (row + 1);
                let size = (data.width / max(numcols, numrows)) * 0.8;
                circle(x, y, size);
            }
        }
    }
}