import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => line.split(' | ').map((segment) => segment.split(' ')));
}

const input = getInput();
console.log(input[0][1])

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

let sum = 0;

input.forEach(line => {
    for (let i = 0; i < 4; i++) {
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