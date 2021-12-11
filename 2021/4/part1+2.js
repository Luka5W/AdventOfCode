"use strict";
exports.__esModule = true;
var fs = require("fs");
var BingoBoard = /** @class */ (function () {
    function BingoBoard(rawInput) {
        var _this = this;
        this.rows = rawInput.split('\n').map(function (rawRow) { return new BingoRow(rawRow.split(' ').filter(function (num) { return num != ''; }).map(Number)); });
        this.cols = [new BingoRow(), new BingoRow(), new BingoRow(), new BingoRow(), new BingoRow()];
        this.disabled = false;
        this.rows.forEach(function (row, i, rows) {
            row.getNumbers().forEach(function (num, j) {
                _this.cols[j].setNumber(i, num);
            });
        });
    }
    BingoBoard.prototype.setMatch = function (number) {
        this.rows.forEach(function (row) {
            row.setMatch(number);
        });
        this.cols.forEach(function (col) {
            col.setMatch(number);
        });
        return this;
    };
    BingoBoard.prototype.match = function () {
        return this._match(this.rows) || this._match(this.cols);
    };
    BingoBoard.prototype.noMatch = function () {
        return this._noMatch(this.rows) && this._noMatch(this.cols);
    };
    BingoBoard.prototype.getScore = function () {
        return this.rows.map(function (row) { return row.getScore(); }).reduce(function (a, b) { return a + b; });
    };
    BingoBoard.prototype.disable = function () {
        this.disabled = true;
    };
    BingoBoard.prototype.isDisabled = function () {
        return this.disabled;
    };
    BingoBoard.prototype._match = function (x) {
        return x.filter(function (x) { return x.match(); }).length != 0;
    };
    BingoBoard.prototype._noMatch = function (x) {
        return x.filter(function (x) { return x.noMatch(); }).length != 0;
    };
    return BingoBoard;
}());
var BingoRow = /** @class */ (function () {
    function BingoRow(numbers) {
        if (numbers === void 0) { numbers = []; }
        this.numbers = numbers;
        this.matches = [false, false, false, false, false];
    }
    BingoRow.prototype.setNumber = function (i, num) {
        if (this.numbers.length == 5)
            throw 'Already Initialized';
        this.numbers[i] = num;
    };
    BingoRow.prototype.getNumbers = function () {
        return this.numbers;
    };
    BingoRow.prototype.setMatch = function (number) {
        var _this = this;
        this.numbers.forEach(function (num, i) {
            if (num == number)
                _this.matches[i] = true;
        });
    };
    BingoRow.prototype.match = function () {
        return !this.matches.includes(false);
    };
    BingoRow.prototype.noMatch = function () {
        return this.matches.includes(false);
    };
    BingoRow.prototype.getScore = function () {
        var _this = this;
        var score = this.numbers.filter(function (num, i) { return _this.matches[i] == false; });
        while (score.length <= 1)
            score.push(0);
        return score.reduce(function (a, b) { return a + b; });
    };
    return BingoRow;
}());
function getInput() {
    var input = fs.readFileSync('./input.txt', 'utf8').split('\n\n');
    return {
        numbers: input.shift().split(',').map(Number),
        boards: input.map(function (board) { return new BingoBoard(board); })
    };
}
var input = getInput();
var partA = Object.assign({}, input);
var partB = Object.assign({}, input);
partA.numbers.every(function (number) {
    return partA.boards.every(function (board) {
        board.setMatch(number);
        if (board.match()) {
            var score = board.getScore() * number;
            console.log("Winner: ".concat(score));
            return false;
        }
        return true;
    });
});
var winners = [];
partB.numbers.forEach(function (number) {
    partB.boards.forEach(function (board) {
        board.setMatch(number);
        if (!board.isDisabled() && board.match()) {
            winners.push(board.getScore() * number);
            board.disable();
        }
    });
});
// Does not work...
console.log("Winner: ".concat(winners[0]));
// Works
console.log("Loser: ".concat(winners[winners.length - 1]));
