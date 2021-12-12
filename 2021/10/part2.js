"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n');
}
var input = getInput();
var scores = [];
var matchTable = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};
var errorTable = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
};
input.forEach(function (line) {
    var lineOK = true;
    var stack = [];
    line.split('').every(function (char) {
        if ('<{[('.includes(char)) {
            stack.push(char);
        }
        else if ('>}])'.includes(char)) {
            var last = stack.pop();
            if (matchTable[char] != last) {
                lineOK = false;
                return false;
            }
        }
        else {
            throw 'IllegalState';
        }
        return true;
    });
    if (lineOK) {
        var score = 0;
        for (var i = stack.length - 1; i > -1; i--) {
            score *= 5;
            score += errorTable[stack[i] + ''];
        }
        scores.push(score);
    }
});
scores = scores.sort(function (n1, n2) { return n1 - n2; });
console.log(scores[Math.floor(scores.length / 2)]);
