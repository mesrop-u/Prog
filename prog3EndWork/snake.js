let LivingCreature = require("./LivingCreature")

module.exports=class Snake extends LivingCreature{
    
    mul() {
        this.multiply++
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[(Math.floor(Math.random() * emptyCells.length))];
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newSnake = new Snake(newX, newY);
            SnakeArr.push(newSnake);
            this.multiply = 0;
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
        if (newCell1 && this.energy >= 0) {
            let newX = newCell1[0]
            let newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(5)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in GrassEaterArr) {
                if (newX == GrassEaterArr[i].x && newY == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
        if (newCell1) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in PoiseArr) {
                if (newX == PoiseArr[i].x && newY == PoiseArr[i].y) {
                    PoiseArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
        
      
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in SnakeArr) {
            if (this.x == SnakeArr[i].x && this.y == SnakeArr[i].y) {
                SnakeArr.splice(i, 1);
                break;
            }
        }
    }
}