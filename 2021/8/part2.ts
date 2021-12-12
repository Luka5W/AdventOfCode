// does not work. given up... -.-

import * as fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => line.split(' | ').map((segment) => segment.split(' ')));

function getCommonSegments(a: String, b: String) {
    let x = 0;
    for (let i = 0; i < a.length; i++) {
        if (b.includes(a[i])) x++;
    }
    return x;
}

let sum = 0;

input.forEach(line => {
    let mappings = [];
    line[0].forEach(digit => {
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
    line[1].forEach(digit => {
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
                } else {
                    if (getCommonSegments(mappings[4], digit) == 2) {
                        sum += 2;
                    } else {
                        sum += 5;
                    }
                }
                break;
            case 6:
                // 6,9,0
                if (getCommonSegments(mappings[1], digit) == 1) {
                    sum += 6;
                } else if (getCommonSegments(mappings[4], digit) == 4) {
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