import * as fs from 'fs';

class BingoBoard {

    public rows: BingoRow[];
    public cols: BingoRow[];
    private disabled: boolean;

    constructor(rawInput: String) {
        this.rows = rawInput.split('\n').map((rawRow) => new BingoRow(rawRow.split(' ').filter((num) => num != '').map(Number)));
        this.cols = [new BingoRow(), new BingoRow(), new BingoRow(), new BingoRow(), new BingoRow()];
        this.disabled = false;
        this.rows.forEach((row, i, rows) => {
            row.getNumbers().forEach((num, j) => {
                this.cols[j].setNumber(i, num);
            });
        });
    }

    public setMatch(number: number) {
        this.rows.forEach((row) => {
            row.setMatch(number);
        });
        this.cols.forEach((col) => {
            col.setMatch(number);
        })
        return this;
    }

    public match(): boolean {
        return this._match(this.rows) || this._match(this.cols);
    }
    public noMatch(): boolean {
        return this._noMatch(this.rows) && this._noMatch(this.cols);
    }

    public getScore() {
        return this.rows.map((row) => row.getScore()).reduce((a, b) => a + b);
    }

    public disable() {
        this.disabled = true;
    }

    public isDisabled() {
        return this.disabled;
    }

    private _match(x: BingoRow[]): boolean {
        return x.filter((x) => x.match()).length != 0;
    }

    private _noMatch(x: BingoRow[]): boolean {
        return x.filter((x) => x.noMatch()).length != 0;
    }
}

class BingoRow {

    private numbers: number[];
    private matches: boolean[];
       
    public constructor(numbers: number[] = []) {
        this.numbers = numbers;
        this.matches = [ false, false, false, false, false ];
    }

    public setNumber(i: number, num: number) {
        if (this.numbers.length == 5) throw 'Already Initialized';
        this.numbers[i] = num;
    }

    public getNumbers(): number[] {
        return this.numbers;
    }

    public setMatch(number: number) {
        this.numbers.forEach((num, i) => {
            if (num == number) this.matches[i] = true;
        });
    }

    public match(): boolean {
        return !this.matches.includes(false);
    }

    public noMatch(): boolean {
        return this.matches.includes(false);
    }

    public getScore(): number {
        const score: number[] = this.numbers.filter((num, i) => this.matches[i] == false);
        while (score.length <= 1 ) score.push(0);
        return score.reduce((a, b) => a + b);
    }
}

function getInput() {
    const input = fs.readFileSync('./input.txt', 'utf8').split('\n\n');
    return {
        numbers: input.shift()!.split(',').map(Number),
        boards: input.map((board) => new BingoBoard(board))
    };
}

const input = getInput();

const partA = Object.assign({}, input);
const partB = Object.assign({}, input);

partA.numbers.every((number) => {
    return partA.boards.every((board) => {
        board.setMatch(number);
        if (board.match()) {
            let score = board.getScore() * number;
            console.log(`Winner: ${score}`);
            return false;
        }
        return true;
    });
});

const winners: number[] = [];

partB.numbers.forEach((number) => {
    partB.boards.forEach((board) => {
        board.setMatch(number);
        if (!board.isDisabled() && board.match()) {
            winners.push(board.getScore() * number);
            board.disable();
        }
    });
});
// Does not work...
console.log(`Winner: ${winners[0]}`);
// Works
console.log(`Loser: ${winners[winners.length - 1]}`);
