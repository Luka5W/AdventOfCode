import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n');
}

const input = getInput();

let errorCount = 0;

const matchTable = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};
const errorTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

input.forEach((line) => {
    let stack: String[] = [];
    line.split('').every((char) => {
        if ('<{[('.includes(char)) {
            stack.push(char);
        } else if ('>}])'.includes(char)) {
            let last = stack.pop();
            if (matchTable[char] != last) {
                errorCount += errorTable[char];
                return false;
            }
        } else {
            throw 'IllegalState';
        }
        return true;
    });
});

console.log(errorCount);