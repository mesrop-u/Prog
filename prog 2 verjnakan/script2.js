function generator(matLen, gr, grEat, pr, sn, po) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < sn; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < po; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let side = 50;

let matrix = generator(15,1, 1,20,1,20);
var grassArr = []
var GrassEaterArr = []
var PredatorArr = []
var SnakeArr = []
var PoiseArr = []
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                GrassEaterArr.push(gre)
            } else if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                PredatorArr.push(pr)
            }
            else if (matrix[y][x] == 4) {
                let sn = new Snake(x, y)
                SnakeArr.push(sn)
            }
            else if (matrix[y][x] == 5) {
                let po = new Poise(x, y)
                PoiseArr.push(po)
            }
        }
    }
}








function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            }
            else if (matrix[y][x] == 5) {
                fill("orange")
            }

            rect(x * side, y * side, side, side);

        }
    }


    for (let i in grassArr) {
        grassArr[i].mul()
    }


    for (let i in GrassEaterArr) {
        GrassEaterArr[i].mul()
        GrassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].mul()
        PredatorArr[i].eat()
    }
    for (let i in SnakeArr) {
        SnakeArr[i].mul()
        SnakeArr[i].move()
    }
    for (let i in PoiseArr) {
        PoiseArr[i].mul()
        PoiseArr[i].move()
    }
}
