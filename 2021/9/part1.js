"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map(function (line) { return line.split('').map(Number); });
}
var input = getInput();
var riskLevel = 0;
input.forEach(function (line, y, lines) {
    line.forEach(function (point, x, points) {
        if ((x == 0 || points[x - 1] > point) &&
            (x == points.length - 1 || points[x + 1] > point) &&
            (y == 0 || lines[y - 1][x] > point) &&
            (y == lines.length - 1 || lines[y + 1][x] > point))
            riskLevel += 1 + point;
    });
});
console.log(riskLevel);
