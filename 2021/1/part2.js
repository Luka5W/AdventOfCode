const { performance } = require('perf_hooks');
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number);
let output = 0;
const timeStart = performance.now();

output = input.filter((e, i, a) => (a[i - 1] + e + a[i + 1]) < (e + a[i + 1] + a[i + 2])).length;

const timeEnd = performance.now();
console.log(`SOLUTION:   ${output}`);
console.log(`TIME TAKEN: ${timeEnd - timeStart}`);