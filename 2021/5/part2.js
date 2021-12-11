"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    var input = fs.readFileSync('./input.txt', 'utf8').split('\n');
    var output = [];
    input.forEach(function (line) {
        output.push(Line.fromString(line));
    });
    return output;
}
var Orientation;
(function (Orientation) {
    Orientation[Orientation["HORIZONTAL"] = 0] = "HORIZONTAL";
    Orientation[Orientation["VERTICAL"] = 1] = "VERTICAL";
    Orientation[Orientation["DIAGONAL"] = 2] = "DIAGONAL";
    Orientation[Orientation["POINT"] = 3] = "POINT";
})(Orientation || (Orientation = {}));
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        if (x1 == x2) {
            if (y1 == y2) {
                this.orientation = Orientation.POINT;
            }
            else {
                this.orientation = Orientation.VERTICAL;
            }
        }
        else {
            if (y1 == y2) {
                this.orientation = Orientation.HORIZONTAL;
            }
            else {
                this.orientation = Orientation.DIAGONAL;
            }
        }
    }
    Line.fromString = function (line) {
        line = line.split(' -> ');
        line[0] = line[0].split(',').map(Number);
        line[1] = line[1].split(',').map(Number);
        return new Line(line[0][0], line[0][1], line[1][0], line[1][1]);
    };
    Line.prototype.isOrientationOK = function () {
        return this.orientation == Orientation.HORIZONTAL || this.orientation == Orientation.VERTICAL || this.orientation == Orientation.DIAGONAL;
    };
    Line.prototype.getPoints = function () {
        if (this.points)
            return this.points;
        this.points = {
            orientation: this.orientation
        };
        if (this.orientation == Orientation.HORIZONTAL) {
            this.points.y = this.y1;
            this.points.x = [];
            if (this.x1 > this.x2) {
                for (var i = this.x2; i <= this.x1; i++) {
                    this.points.x.push(i);
                }
            }
            else {
                // this.x1 < this.x2
                for (var i = this.x1; i <= this.x2; i++) {
                    this.points.x.push(i);
                }
            }
        }
        else if (this.orientation == Orientation.VERTICAL) {
            this.points.x = this.x1;
            this.points.y = [];
            if (this.y1 > this.y2) {
                for (var i = this.y2; i <= this.y1; i++) {
                    this.points.y.push(i);
                }
            }
            else {
                // this.y1 < this.y2
                for (var i = this.y1; i <= this.y2; i++) {
                    this.points.y.push(i);
                }
            }
        }
        else if (this.orientation == Orientation.DIAGONAL) {
            // assuming lines are 45°
            this.points.x = [];
            this.points.y = [];
            if (this.x1 < this.x2) {
                if (this.y1 < this.y2) {
                    for (var x = this.x1, y = this.y1; x <= this.x2; x++, y++) {
                        this.points.x.push(x);
                        this.points.y.push(y);
                    }
                }
                else {
                    for (var x = this.x1, y = this.y1; x <= this.x2; x++, y--) {
                        this.points.x.push(x);
                        this.points.y.push(y);
                    }
                }
            }
            else {
                if (this.y1 < this.y2) {
                    for (var x = this.x1, y = this.y1; x >= this.x2; x--, y++) {
                        this.points.x.push(x);
                        this.points.y.push(y);
                    }
                }
                else {
                    for (var x = this.x1, y = this.y1; x >= this.x2; x--, y--) {
                        this.points.x.push(x);
                        this.points.y.push(y);
                    }
                }
            }
        }
        return this.points;
    };
    return Line;
}());
var input = getInput().filter(function (line) { return line.isOrientationOK(); }).map(function (line) { return line.getPoints(); });
var grid = [];
var points = 0;
input.forEach(function (line) {
    if (line.orientation == Orientation.HORIZONTAL) {
        line.x.forEach(function (x) {
            if (!grid[x])
                grid[x] = [];
            if (!grid[x][line.y]) {
                grid[x][line.y] = 1;
            }
            else {
                grid[x][line.y]++;
            }
            if (grid[x][line.y] == 2)
                points++;
        });
    }
    else if (line.orientation == Orientation.VERTICAL) {
        if (!grid[line.x])
            grid[line.x] = [];
        line.y.forEach(function (y) {
            if (!grid[line.x][y]) {
                grid[line.x][y] = 1;
            }
            else {
                grid[line.x][y]++;
            }
            if (grid[line.x][y] == 2)
                points++;
        });
    }
    else if (line.orientation == Orientation.DIAGONAL) {
        for (var i = 0; i < line.x.length; i++) {
            if (!grid[line.x[i]])
                grid[line.x[i]] = [];
            if (!grid[line.x[i]][line.y[i]]) {
                grid[line.x[i]][line.y[i]] = 1;
            }
            else {
                grid[line.x[i]][line.y[i]]++;
            }
            if (grid[line.x[i]][line.y[i]] == 2)
                points++;
        }
    }
});
console.log("Points with overlaping lines: ".concat(points));
