let LivingCreature = require("./LivingCreature")

module.exports =class Poise extends LivingCreature {
   
    mul() {
        this.multiply++
        var emptyCells = super.chooseCell(0);       
        var newCell = emptyCells[(Math.floor(Math.random() * emptyCells.length))];
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newPoise = new Poise(newX, newY);
            PoiseArr.push(newPoise);
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
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in PoiseArr) {
            if (this.x == PoiseArr[i].x && this.y == PoiseArr[i].y) {
                PoiseArr.splice(i, 1);
                break;
            }
        }
    }
}