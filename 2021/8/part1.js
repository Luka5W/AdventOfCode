"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map(function (line) { return line.split(' | ').map(function (segment) { return segment.split(' '); }); });
}
var input = getInput();
console.log(input[0][1]);
/*
 *  AAA
 * F   B
 * F   B
 * F   B
 *  GGG
 * E   C
 * E   C
 * E   C
 *  DDD
 */
var sum = 0;
input.forEach(function (line) {
    for (var i = 0; i < 4; i++) {
        switch (line[1][i].length) {
            case 2:
                sum++;
                break;
            case 3:
                sum++;
                break;
            case 4:
                sum++;
                break;
            case 7:
                sum++;
                break;
        }
    }
});
console.log(sum);
