var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");



app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000),() =>{
console.log("run")
};

function generator(matLen, gr, gre, pr, snake, poise) {
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
    for (let i = 0; i < gre; i++) {
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
    for (let i = 0; i < snake; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < poise; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}
 matrix = generator(20, 10, 5, 2, 2, 3);

io.sockets.emit('send matrix',matrix)

grassArr = []
GrassEaterArr = []
predatorArr = []
SnakeArr = []
PoiseArr = []



Grass = require("./grass")
GrassEater = require("./grasseater")
Predator = require("./predator")
Snake = require("./snake")
Poise = require("./poise")
weath = "winter";

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
               predatorArr.push(pr)
           } else if (matrix[y][x] == 4) {
               let snake = new Snake(x, y)
               SnakeArr.push(snake)
           } else if (matrix[y][x] == 5) {
               let poise = new Poise(x, y)
               PoiseArr.push(poise)
           }
       }
   }
   io.sockets.emit('send matrix',matrix)
   
}

function game(){
   for (let i in grassArr) {
      grassArr[i].mul()
  }


  for (let i in GrassEaterArr) {
      GrassEaterArr[i].mul()
      GrassEaterArr[i].eat()
  }
  for (let i in predatorArr) {
      predatorArr[i].mul()
      predatorArr[i].eat()
  }
  for (let i in SnakeArr) {
      SnakeArr[i].mul()
      SnakeArr[i].move()
  }
  for (let i in PoiseArr) {
       PoiseArr[i].mul()
      PoiseArr[i].move()
  }
  io.sockets.emit('send matrix',matrix)
}
setInterval(game,200)

function kill() {
   grassArr = [];
   grassEaterArr = []
   for (var y = 0; y < matrix.length; y++) {
       for (var x = 0; x < matrix[y].length; x++) {
           matrix[y][x] = 0;
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addGrass() {
   for (var i = 0; i < 5; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 1
           var gr = new Grass(x, y, 1)
           grassArr.push(gr)
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
   for (var i = 0; i < 3; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 2
           var gre = new GrassEater(x, y, 2)
           GrassEaterArr.push(gre)
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addPredator() {
   for (var i = 0; i < 5; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 3
           var pr = new Predator(x, y, 3)
           predatorArr.push(pr)
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addSnake() {
   for (var i = 0; i < 5; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 4
           var sn = new Snake(x, y, 4)
           SnakeArr.push(sn)
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addPoise() {
   for (var i = 0; i < 3; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 5
           var poise = new Poise(x, y, 5)
           PoiseArr.push(poise)
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function weather() {
   if (weath == "winter") {
       weath = "spring"
   }
   else if (weath == "spring") {
       weath = "summer"
   }
   else if (weath == "summer") {
       weath = "autumn"
   }
   else if (weath == "autumn") {
       weath = "winter"
   }
   io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function(socket){
   createObject(matrix)
   socket.on("kill", kill);
   socket.on("add grass", addGrass);
   socket.on("add grassEater", addGrassEater);
   socket.on("add predator", addPredator);
   socket.on("add snake", addSnake);
   socket.on("add poise", addPoise);
})
var statistics = {}
setInterval(function() {
   statistics.grass = grassArr.length;
   statistics.grassEater = GrassEaterArr.length;
   statistics.predator = predatorArr.length;
   statistics.snake = SnakeArr.length;
   statistics.poise = PoiseArr.length;
   fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
       console.log("send")
   })
},1000)

