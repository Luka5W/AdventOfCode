import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => line.split('').map(Number));
}

const input = getInput();

let riskLevel = 0;

input.forEach((line, y, lines) => {
    
});

console.log(riskLevel);