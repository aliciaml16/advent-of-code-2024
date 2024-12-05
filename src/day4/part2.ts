import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day4/input.txt');
const input = readFileSync(inputPath).toString();

const rows: string[] = input.trim().split("\n");

const columns: string[] = rows[0].split("").map((_value, i) =>
    rows.map(row => row[i]).join("")
);

let result = 0;
for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < columns.length; col++) {
        if (rows[row][col] === 'A') {
            const wordOneLetterOne = valueBetweenBounds(row - 1, col - 1);
            const wordOneLetterThree = valueBetweenBounds(row + 1, col + 1);
            const wordTwoLetterOne = valueBetweenBounds(row - 1, col + 1);
            const wordTwoLetterThree = valueBetweenBounds(row + 1, col - 1);

            const isWordOneComplete = (wordOneLetterOne === 'S' && wordOneLetterThree === 'M') || (wordOneLetterOne === 'M' && wordOneLetterThree === 'S');
            const isWordTwoComplete = (wordTwoLetterOne === 'S' && wordTwoLetterThree === 'M') || (wordTwoLetterOne === 'M' && wordTwoLetterThree === 'S')

            if (isWordOneComplete && isWordTwoComplete) {
                result = result + 1
            }
        }
    }
}

function valueBetweenBounds(row: number, col: number) {
    if (row >= 0 && row < rows.length && col >= 0 && col < columns.length) {
        return rows[row][col]
    }
    return ''
}

console.log('Day 4, part 2: ', result);