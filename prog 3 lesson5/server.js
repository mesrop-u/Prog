var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000),() =>{
   console.log("run ")
};
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



matrix = generator(15,20, 10,10,10,10);

io.sockets.emit('send matrix',matrix);

grassArr = []
GrassEaterArr = []
PredatorArr = []
SnakeArr = []
PoiseArr = []


Grass = require("./grass")
GrassEater = require("./grasseater")
Predator = require("./predator")
Snake = require("./snake")
Poise = require("./poise")

function createObject(matrix){
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
  
  io.sockets.emit('send matrix',matrix);

}
function game(){

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

  io.sockets.emit('send matrix',matrix);
  
}

setInterval(game,200)
io.on('connection',function(){
   createObject(matrix)
})









