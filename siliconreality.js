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


function setup() {
    // background color
    x = 10
    let bg = color(Math.trunc(random(0, x)), Math.trunc(random(0, x)), Math.trunc(random(0, x)))

    canvaspx = 600

    createCanvas(canvaspx, canvaspx)
    background(bg)

    z = height / 2
    h = height / 2
}


function draw() {
    // specimen variables ------------
    // add border
    fill(0, 0, 0, 0)
    strokeWeight(2)
    stroke(200)
    // rect(0,0, width, height) 
    strokeWeight(0) // reset stroke


    let cl = []
    let rmax = 30

    palette = [
        color(112, 132, 68), // light green
        color(58, 90, 45), // dark green
        color(252, 188, 25), // light yellow
        color(251, 215, 0), // dark yellow
        color(183, 37, 46), // red
        color(248, 147, 29), // light orange
        color(223, 103, 39), // dark orange
        color(255, 255, 255) // dark orange
    ]

    let numrows = Math.trunc(random(4, rmax)) // # of rows
    let numcols = numrows + Math.trunc(random(-4, 4)) // # of cols
    let p = []

    // choose shape colors
    // let n = Math.trunc(random(2, palette.length))
    let n = 1
    for (i = 0; i <= n; i++) {
        cl[i] = random(palette)
    }

    // define shape position matrix
    for (col = 0; col <= numcols; col++) {
        p[col] = []
        for (row = 0; row <= numrows; row++) {
            p[col][row] = Math.trunc(random(0.5, 2)) // this defines the chance of a position having a circle
        }
    }

    // draw shapes
    for (col = 0; col < numcols - 2; col++) {
        for (row = 0; row < numrows - 2; row++) {
            if (p[col][row] === 1) {
                color = random(cl)

                dist = Math.trunc(random(0, 1.1)) // choose transparency distribution skewness
                if (dist === 1) {
                    alpha = randn_bm(1, 255, 0.15) // closer to 255
                } else {
                    alpha = randn_bm(1, 255, 2.5)  // closer to 1
                }
                color.setAlpha(alpha) //choose transparency

                fill(color)
                x = width / (numcols - 1) * (col + 1)
                y = height / (numrows - 1) * (row + 1)
                size = (width / max(numcols, numrows)) * 0.8
                circle(x, y, size)
            }
        }
    }


    // fill(255,255,255,255)
    // circle(z, h, 24);
    // z = z + 1;
    // h = h + 2;
}

