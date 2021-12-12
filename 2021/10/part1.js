"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n');
}
var input = getInput();
var errorCount = 0;
var matchTable = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};
var errorTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};
input.forEach(function (line) {
    var stack = [];
    line.split('').every(function (char) {
        if ('<{[('.includes(char)) {
            stack.push(char);
        }
        else if ('>}])'.includes(char)) {
            var last = stack.pop();
            if (matchTable[char] != last) {
                errorCount += errorTable[char];
                return false;
            }
        }
        else {
            throw 'IllegalState';
        }
        return true;
    });
});
console.log(errorCount);
