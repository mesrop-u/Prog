var socket = io()
var side = 50;
function setup() {
    frameRate(5);
    createCanvas(15 * side, 15 * side);
    background('#acacac');   
}
function nkarel(matrix) {
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
}

setInterval(
    function(){
        socket.on('send matrix',nkarel)
    },1000
)