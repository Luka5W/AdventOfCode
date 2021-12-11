import * as fs from 'fs';

/*
 * old way is consuming too much ram, switched technique:
 * [
 *   0: amount of fishes with value 0
 *   ...
 *   8: amount of fishes with value 8
 * ]
 */

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
const fishes = new Array(9).fill(0);
input.forEach((value) => {
    fishes[value]++;
});

for (let day = 0; day < 256; day++) {
    const zeroFishes = fishes.shift();
    fishes.push(zeroFishes);
    fishes[6] += zeroFishes;
}

let fishCount = 0;
for(let i = 0; i < 9; i++) {
    fishCount += fishes[i];
}
console.log(fishCount);