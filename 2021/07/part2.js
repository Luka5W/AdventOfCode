"use strict";
exports.__esModule = true;
var fs = require("fs");
function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
}
var input = getInput();
var leastFuelConsumption = -1;
input.forEach(function (targetPos) {
    var currentFuelConsumption = 0;
    input.forEach(function (currentPos) {
        var diff = currentPos - targetPos;
        if (diff < 0)
            diff *= -1;
        var diffFuelCOnsumption = 0;
        for (var i = 1; i <= diff; i++) {
            diffFuelCOnsumption += i;
        }
        currentFuelConsumption += diffFuelCOnsumption;
    });
    if (leastFuelConsumption == -1 || leastFuelConsumption > currentFuelConsumption)
        leastFuelConsumption = currentFuelConsumption;
});
console.log(leastFuelConsumption);
