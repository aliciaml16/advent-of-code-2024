import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day4/input.txt');
const input = readFileSync(inputPath).toString();

const rows: string[] = input.trim().split("\n");

const columns: string[] = rows[0].split("").map((_value, i) =>
    rows.map(row => row[i]).join("")
);

const numPossibleDiagonals = rows.length + columns.length - 1
const diagonalsRight: string[] = [];
for (let xPos = 0; xPos < numPossibleDiagonals; xPos++) {
    let textValue = "";

    for (let yPos = 0; yPos < rows.length; yPos++) {
        const stringPos = xPos - yPos;

        if (stringPos >= 0 && stringPos < columns.length) {
            textValue += rows[yPos][stringPos];
        }
    }
    diagonalsRight.push(textValue);
}

const diagonalsLeft: string[] = [];
for (let xPos = 0; xPos < numPossibleDiagonals; xPos++) {
    let textValue = "";

    for (let yPos = 0; yPos < rows.length; yPos++) {
        const stringPos = columns.length - (xPos - yPos) - 1;

        if (stringPos >= 0 && stringPos < columns.length) {
            textValue += rows[yPos][stringPos];
        }
    }
    diagonalsLeft.push(textValue);
}

const allStrings = [...rows, ...columns, ...diagonalsRight, ...diagonalsLeft]
const regex = /XMAS/g;
const regexBackwards = /SAMX/g;
let result = 0;
allStrings.map(value => {
    const matches = value.match(regex);
    if (matches) {
        result = result + matches.length;
    }
})
allStrings.map(value => {
    const matches = value.match(regexBackwards);
    if (matches) {
        result = result + matches.length;
    }
})

console.log('Day 4, part 1: ', result);