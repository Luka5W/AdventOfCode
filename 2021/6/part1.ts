import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
}


const input = getInput();
for (let day = 0; day < 80; day++) {
    for(let i = 0; i < input.length; i++) {
        input[i]--;
        if (input[i] == -1) {
            input[i] = 6
            input.push(9); // 1 more cuz it will be subtracted at this day
        }
    }
}
console.log(input.length);