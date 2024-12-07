import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day6/input.txt');
const input = readFileSync(inputPath).toString();

const rows = input.split('\n');
let rowPos = 0;
let colPos = 0;
let result = 0;
rows.forEach((row, index) => {
    if (row.includes('^')) {
        rowPos = index;
        colPos = row.indexOf('^');
    }
});

goUp(rowPos, colPos);

function replaceString(r: number, c: number) {
    const arr = rows[r].split('');
    arr[c] = 'X';
    rows[r] = arr.join('');
}

function goUp(r: number, c: number) {
    replaceString(r, c);
    if (r - 1 < 0) {
        end();
    } else if (rows[r - 1][c] !== '#') {
        goUp(r - 1, c);
    } else {
        goRight(r, c);
    }
}

function goRight(r: number, c: number) {
    replaceString(r, c);
    if (c + 1 >= rows[r].length) {
        end();
    } else if (rows[r][c + 1] !== '#') {
        goRight(r, c + 1);
    } else {
        goDown(r, c);
    }
}

function goDown(r: number, c: number) {
    replaceString(r, c);
    if (r + 1 >= rows.length) {
        end();
    } else if (rows[r + 1][c] !== '#') {
        goDown(r + 1, c);
    } else {
        goLeft(r, c);
    }
}

function goLeft(r: number, c: number) {
    replaceString(r, c);
    if (c - 1 < 0) {
        end();
    } if (rows[r][c - 1] !== '#') {
        goLeft(r, c - 1);
    } else {
        goUp(r, c);
    }
}

function end() {
    rows.forEach(row => {
        const arr = row.split('');
        arr.find(arr => {
            if (arr === 'X') {
                result += 1;
            }
        });
    })
}

console.log('Day 6, part 1: ', result);