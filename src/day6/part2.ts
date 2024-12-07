import { dir } from "console";
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day6/input.txt');
const input = readFileSync(inputPath).toString();

let arrayToCheck: string[] = input.split('\n');
let rowPos = 0;
let colPos = 0;

input.split('\n').forEach((row, index) => {
    if (row.includes('^')) {
        rowPos = index;
        colPos = row.indexOf('^');
    }
});

const possiblePositions: string[][] = [];
for (let row = 0; row < input.split('\n').length; row++) {
    for (let col = 0; col < input.split('\n')[row].length; col++) {
        if (input.split('\n')[row][col] !== '#' && input.split('\n')[row][col] !== '^') {
            const rows = replaceString(input.split('\n'), row, col, '#');
            possiblePositions.push(rows);
        }
    }
}

let result = 0;

possiblePositions.forEach((position, index) => {
    arrayToCheck = position;
    move(rowPos, colPos, 'UP', index);
})

function replaceString(array: string[], r: number, c: number, value: string): string[] {
    const arr = array[r].split('');
    arr[c] = value;
    array[r] = arr.join('');
    return array;
}

function move(r: number, c: number, direction: string, index: number) {
    while (true) {
        let nextR = r;
        let nextC = c;

        if (direction === 'UP') {
            nextR = r - 1;
        } else if (direction === 'RIGHT') {
            nextC = c + 1;
        } else if (direction === 'DOWN') {
            nextR = r + 1;
        } else if (direction === 'LEFT') {
            nextC = c - 1;
        }

        if (nextR < 0 || nextR >= arrayToCheck.length || nextC < 0 || nextC >= arrayToCheck[r].length) {
            break;
        } else if (arrayToCheck[nextR][nextC] !== '#') {
            r = nextR;
            c = nextC;
            continue;
        } else {
            const currentChar = arrayToCheck[r][c];
            if ((currentChar === 'R' && direction === 'UP')
                || (currentChar === 'D' && direction === 'RIGHT')
                || (currentChar === 'L' && direction === 'DOWN')
                || (currentChar === 'U' && direction === 'LEFT')) {
                result += 1;
                break;
            } else {
                const nextDirection = nextDir(direction);
                if (currentChar !== 'R' && currentChar !== 'D' && currentChar !== 'L' && currentChar !== 'U') {
                    replaceString(arrayToCheck, r, c, charDir(direction));
                }
                direction = nextDirection;
                continue;
            }
        }
    }
}


function charDir(direction: string): string {
    if (direction === 'UP') return 'R';
    if (direction === 'RIGHT') return 'D';
    if (direction === 'DOWN') return 'L';
    return 'U';
}

function nextDir(direction: string): string {
    if (direction === 'UP') return 'RIGHT';
    if (direction === 'RIGHT') return 'DOWN';
    if (direction === 'DOWN') return 'LEFT';
    return 'UP';
}

console.log('Day 6, part 2: ', result);
