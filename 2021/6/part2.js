"use strict";
exports.__esModule = true;
var fs = require("fs");
/*
 * old way is consuming too much ram, switched technique:
 * [
 *   0: amount of fishes with value 0
 *   ...
 *   8: amount of fishes with value 8
 * ]
 */
var input = fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
var fishes = new Array(9).fill(0);
input.forEach(function (value) {
    fishes[value]++;
});
for (var day = 0; day < 256; day++) {
    var zeroFishes = fishes.shift();
    fishes.push(zeroFishes);
    fishes[6] += zeroFishes;
}
var fishCount = 0;
for (var i = 0; i < 9; i++) {
    fishCount += fishes[i];
}
console.log(fishCount);
