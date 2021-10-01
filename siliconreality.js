
function setup() {
    // background color
    x = 10
    let bg = color(Math.trunc(random(0, x)), Math.trunc(random(0, x)), Math.trunc(random(0, x)))

    canvaspx = 600

    createCanvas(canvaspx, canvaspx)
    background(bg)
    noLoop()
    angleMode(DEGREES)
    filter(BLUR)
}


function draw() {
    fill(0,0,0,0)
    strokeWeight(2)
    stroke(255)
    // rect(0,0, width, height)
    
    strokeWeight(0)

    let cl = []
    let rmax = 40

    // specimen variables ------------
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
    let numcols = numrows + Math.trunc(random(0, 4)) // # of cols
    let p = []

    // shape colors
    let n = Math.trunc(random(2, palette.length))
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
    for (col = 0; col < numcols-2; col++) {
        for (row = 0; row < numrows-2; row++) {
            if (p[col][row] === 1) {
                color = random(cl)
                color.setAlpha(random(5,255))
                fill(color)
                circle(
                    width / (numcols - 1) * (col+1),
                    height / (numrows - 1) * (row+1),
                    width / max(numcols, numrows) - (width / numcols * 0.1)
                    )
            }
        }
    }
}