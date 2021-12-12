"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
}
var input = getInput();
for (var day = 0; day < 80; day++) {
    for (var i = 0; i < input.length; i++) {
        input[i]--;
        if (input[i] == -1) {
            input[i] = 6;
            input.push(9); // 1 more cuz it will be subtracted at this day
        }
    }
}
console.log(input.length);
