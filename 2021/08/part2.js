"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map(function (line) { return line.split(' | ').map(function (segment) { return segment.split(' '); }); });
}
var input = getInput();
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
function getCommonSegments(a, b) {
    var x = 0;
    for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i]))
            x++;
    }
    return x;
}
var sum = 0;
input.forEach(function (line) {
    var mappings = [];
    line[0].forEach(function (digit) {
        switch (digit.length) {
            case 2:
                mappings[1] = digit;
                break;
            case 3:
                mappings[7] = digit;
                break;
            case 4:
                mappings[4] = digit;
                break;
            case 7:
                mappings[8] = digit;
                break;
        }
    });
    line[1].forEach(function (digit) {
        switch (digit.length) {
            case 2:
                sum += 1;
                break;
            case 3:
                sum += 7;
                break;
            case 4:
                sum += 4;
                break;
            case 5:
                // 2,3,5
                if (getCommonSegments(mappings[1], digit) == 2) {
                    sum += 3;
                }
                else {
                    if (getCommonSegments(mappings[4], digit) == 2) {
                        sum += 2;
                    }
                    else {
                        sum += 5;
                    }
                }
                break;
            case 6:
                // 6,9,0
                if (getCommonSegments(mappings[1], digit) == 1) {
                    sum += 6;
                }
                else if (getCommonSegments(mappings[4], digit) == 4) {
                    sum += 9;
                }
                break;
            case 7:
                sum += 8;
                break;
        }
    });
});
console.log(sum);
