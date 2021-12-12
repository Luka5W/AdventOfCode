import * as fs from 'fs';

function getInput(): Line[] {
    const input = fs.readFileSync('./input.txt', 'utf8').split('\n');
    const output: Line[] = [];
    input.forEach((line) => {
        output.push(Line.fromString(line));
    });
    return output;
}

enum Orientation {
    HORIZONTAL,
    VERTICAL,
    DIAGONAL,
    POINT
}

class Line {

    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private orientation: Orientation;
    private points;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        if (x1 == x2) {
            if (y1 == y2) {
                this.orientation = Orientation.POINT;
            } else {
                this.orientation = Orientation.VERTICAL;
            }
        } else if (y1 == y2) {
            this.orientation = Orientation.HORIZONTAL;
        } else {
            this.orientation = Orientation.DIAGONAL;
        }
    }

    public static fromString(line) {
        line = line.split(' -> ');
        line[0] = line[0].split(',').map(Number);
        line[1] = line[1].split(',').map(Number);
        return new Line(line[0][0], line[0][1], line[1][0], line[1][1]);
    }

    public isOrientationOK(): boolean {
        return this.orientation == Orientation.HORIZONTAL || this.orientation == Orientation.VERTICAL;
    }

    public getPoints() {
        if (this.points) return this.points;
        this.points = {
            orientation: this.orientation
        };
        if (this.orientation == Orientation.HORIZONTAL) {
            this.points.y = this.y1;
            this.points.x = [];
            if (this.x1 > this.x2) {
                for (let i = this.x2; i <= this.x1; i++) {
                    this.points.x.push(i);
                }
            } else {
                // this.x1 < this.x2
                for (let i = this.x1; i <= this.x2; i++) {
                    this.points.x.push(i);
                }
            }
        } else if (this.orientation == Orientation.VERTICAL) {
            this.points.x = this.x1;
            this.points.y = [];
            if (this.y1 > this.y2) {
                for (let i = this.y2; i <= this.y1; i++) {
                    this.points.y.push(i);
                }
            } else {
                // this.y1 < this.y2
                for (let i = this.y1; i <= this.y2; i++) {
                    this.points.y.push(i);
                }
            }
        }
        return this.points;
    }
}

const input = getInput().filter((line) => line.isOrientationOK()).map((line) => line.getPoints());
const grid = []
let points = 0;
input.forEach((line) => {
    if (line.orientation == Orientation.HORIZONTAL) {
        line.x.forEach(x => {
            if (!grid[x]) grid[x] = [];
            if (!grid[x][line.y]) {
                grid[x][line.y] = 1;
            } else {
                grid[x][line.y]++;
            }
            if (grid[x][line.y] == 2) points++;
        });
    } else if (line.orientation == Orientation.VERTICAL) {
        if (!grid[line.x]) grid[line.x] = [];
        line.y.forEach(y => {
            if (!grid[line.x][y]) {
                grid[line.x][y] = 1;
            } else {
                grid[line.x][y]++;
            }
            if (grid[line.x][y] == 2) points++;
        });
    }
});
console.log(`Points with overlaping lines: ${points}`);
