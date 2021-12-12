import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
}


const input = getInput();
let leastFuelConsumption = -1;
input.forEach((targetPos) => {
    let currentFuelConsumption = 0;
    input.forEach((currentPos) => {
        let diff = currentPos - targetPos;
        if ( diff < 0) diff *= -1;
        currentFuelConsumption += diff;
    });
    if (leastFuelConsumption == -1 || leastFuelConsumption > currentFuelConsumption) leastFuelConsumption = currentFuelConsumption;
});

console.log(leastFuelConsumption);