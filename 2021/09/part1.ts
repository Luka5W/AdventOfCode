import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').map((line) => line.split('').map(Number));
}

const input = getInput();

let riskLevel = 0;

input.forEach((line, y, lines) => {
    line.forEach((point, x, points) => {
        if ((x == 0 || points[x - 1] > point) &&
            (x == points.length -1 || points[x + 1] > point) &&
            (y == 0 || lines[y - 1][x] > point) &&
            (y == lines.length - 1 || lines[y + 1][x] > point)) riskLevel += 1 + point;
    });
});

console.log(riskLevel);