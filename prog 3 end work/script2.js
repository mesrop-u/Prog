
var socket = io()
var side = 50;
function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
    
}
socket.on("weather", function (data) {
    weath = data;
})
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                }else if (weath == "autumn") {
                    fill("#333300");
                }else if (weath == "winter") {
                    fill("white");
                }else if (weath == "spring") {
                    fill("#4dffa6");
                }
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
}
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                
        }else if (obj == 2) {
                fill("yellow");
            }else if (obj == 0){
                fill("grey")
            }
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on('send matrix', nkarel)


setInterval(

    
    function(){
        socket.on('send matrix', nkarel)
    },1000
)

function kill() {
    socket.emit("kill")
    }
function addGrass() {
socket.emit("add grass")
}
function addGrassEater() {
socket.emit("add grassEater")
}   
function addPredator() {
socket.emit("add predator")
}
function addSnake() {
socket.emit("add snake")
}
function addPoise() {
socket.emit("add poise")
}





   







// let matrix = generator(15,20, 10,10,10,10);
// var grassArr = []
// var GrassEaterArr = []
// var PredatorArr = []
// var SnakeArr = []
// var PoiseArr = []
// function setup() {
//     frameRate(5);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 let gr = new Grass(x, y)
//                 grassArr.push(gr)
//             } else if (matrix[y][x] == 2) {
//                 let gre = new GrassEater(x, y)
//                 GrassEaterArr.push(gre)
//             } else if (matrix[y][x] == 3) {
//                 let pr = new Predator(x, y)
//                 PredatorArr.push(pr)
//             }
//             else if (matrix[y][x] == 4) {
//                 let sn = new Snake(x, y)
//                 SnakeArr.push(sn)
//             }
//             else if (matrix[y][x] == 5) {
//                 let po = new Poise(x, y)
//                 PoiseArr.push(po)
//             }
//         }
//     }
// }