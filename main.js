
// Global object to hold variables
let sketchData, bg, colorIndex, chosenPalette;
let totalShapes = 0;
let layerShapes = 0;
let layerCounter = 1;
let artwork = {};
artwork.data = []
let maxLayers = 15

// distribution with skewness function
function randn_bm(min, max, skew) {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0)
        num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    else {
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
    }
    return num;
}

// ------------------------------------------------------------------------------------------------------

function setup() {
    const canvasDiv = document.getElementById("canvas");
    const width = canvasDiv.offsetWidth;
    const height = canvasDiv.offsetHeight;
    document.getElementById("redrawButton").addEventListener("click", redrawCanvas);

    let canvas = createCanvas(width, height);
    canvas.parent("canvas");

    let bg = color(
        Math.trunc(random(0, 15)),
        Math.trunc(random(0, 15)),
        Math.trunc(random(0, 15))
    );

    background(bg);

    sketchData = {
        width: width,
        height: height,
        palettes: [
            color(162, 192, 108), // light green
            color(150, 188, 25), // light yellow
            color(201, 175, 0), // dark yellow
            color(223, 37, 46), // red
            color(248, 147, 29), // light orange
            color(203, 103, 39), // dark orange
            color(200, 200, 200), // white
            color(153, 125, 148), // white
            // color(100, 100, 100), // white
            // color(80, 80, 80), // white
        ],
    };

    colorIndex = Math.trunc(random(0, sketchData.palettes.length));
    chosenPalette = sketchData.palettes[colorIndex]
    artwork.color = color(red(chosenPalette), green(chosenPalette), blue(chosenPalette));
    artwork.bg = color(red(bg), green(bg), blue(bg))

}

// ------------------------------------------------------------------------------------------------------

function draw() {

    // noLoop();
    loop();

    if (layerCounter === maxLayers) {
        noLoop();
        console.log(artwork)
    }

    drawLayer(sketchData, chosenPalette);

    totalShapes = totalShapes + layerShapes
    document.getElementById('shapeCount').innerText = totalShapes
    document.getElementById('dataPoints').innerText = totalShapes * 3 + 2*maxLayers + 2
    layerCounter++;

}

// ------------------------------------------------------------------------------------------------------

function drawLayer(data, color) {
    let rmax = 150;
    let rmin = 20;
    let layer = {};

    layer.rows = Math.trunc(random(rmin, rmax));
    layer.cols = layer.rows + Math.trunc(random(-10, 10));
    layer.shapes = []

    // console.log("rows: " + numrows);
    // console.log("cols: " + numcols);

    // define layer
    let shapeId = 0
    for (let row = 0; row <= layer.rows; row++) {
        for (let col = 0; col <= layer.cols; col++) {
            let isShape = Math.round(random(0, 0.58)); // odds of there being a shape

            if (isShape === 1) {
                layer.shapes[shapeId] = {};
                layer.shapes[shapeId].row = row;
                layer.shapes[shapeId].col = col;

                let highOrLowOpacity = Math.round(random(0, 0.52)); // odds of higher opacity
                if (highOrLowOpacity === 1) {
                    layer.shapes[shapeId].opacity = Math.round(randn_bm(1, 250, 0.4)); // closer to 250
                } else {
                    layer.shapes[shapeId].opacity = Math.round(randn_bm(1, 250, 3)); // closer to 250
                }
                shapeId++
            }
        }
    }

    // draw layer
    for (let i = 0; i < layer.shapes.length; i++) {
        let opacity = layer.shapes[i].opacity;
        let row = layer.shapes[i].row
        let col = layer.shapes[i].col

        color.setAlpha(opacity);
        fill(color);
        let x = (data.width / layer.cols) * col + (data.width / layer.cols) / 2;
        let y = (data.height / layer.rows) * row + (data.height / layer.rows) / 2;
        let size = (data.width / max(layer.cols, layer.rows)) * 0.8;
        circle(x, y, size);
    }


    layerShapes = layer.shapes.length
    artwork.data[layerCounter] = layer;

}

// ------------------------------------------------------------------------------------------------------

function redrawCanvas() {
    clear();
    layerCounter = 0;
    totalShapes = 0;

    let bg = color(
        Math.trunc(random(0, 10)),
        Math.trunc(random(0, 10)),
        Math.trunc(random(0, 10))
    );

    background(bg);

    colorIndex = Math.trunc(random(0, sketchData.palettes.length));
    chosenPalette = sketchData.palettes[colorIndex]

    redraw();
}
