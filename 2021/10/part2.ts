import * as fs from 'fs';

function getInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n');
}

const input = getInput();

let scores: number[] = [];

const matchTable = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};
const errorTable = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
};

input.forEach((line) => {
    let lineOK = true;
    let stack: String[] = [];
    line.split('').every((char) => {
        if ('<{[('.includes(char)) {
            stack.push(char);
        } else if ('>}])'.includes(char)) {
            let last = stack.pop();
            if (matchTable[char] != last) {
                lineOK = false;
                return false;
            }
        } else {
            throw 'IllegalState';
        }
        return true;
    })
    if (lineOK) {
        let score = 0;
        for (let i = stack.length - 1; i > -1; i--) {
            score *= 5;
            score += errorTable[stack[i] + ''];
        }
        scores.push(score);
    }
});

scores = scores.sort((n1,n2) => n1 - n2);

console.log(scores[Math.floor(scores.length / 2)]);