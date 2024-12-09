import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day8/input.txt');
const input = readFileSync(inputPath).toString();

let rows = input.split('\n');
const checkedFreq: string[] = [];
let result = 0;

rows.forEach(row => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== '.' && row[i] !== '#' && !checkedFreq.includes(row[i])) {
            checkedFreq.push(row[i]);
            checkFrequency(row[i]);
        }
    }
});

function checkFrequency(freq: string) {
    const freqPos: number[][] = [];
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < rows[i].length; n++) {
            if (rows[i][n] === freq) {
                freqPos.push([i, n]);
            }
        }
    }

    freqPos.forEach(pos => {
        const [row, col] = pos;
        freqPos.forEach(position => {
            const [posRow, posCol] = position;
            if (posRow !== row && posCol !== col) {
                const rowDiff = posRow - row;
                const colDiff = posCol - col;
                replaceString(row - rowDiff, col - colDiff);
            }
        });
    });
}

function replaceString(row: number, col: number) {
    if (row >= 0 && row < rows.length && col >= 0 && col < rows[0].length) {
        if (rows[row][col] === '.') {
            const arr = rows[row].split('');
            arr[col] = '#';
            rows[row] = arr.join('');
        } else if (rows[row][col] !== '#') {
            result++;
        }
    }
}

rows.forEach(row => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] === '#') {
            result++;
        }
    }
});

console.log('Day 8, part 1: ', result);
