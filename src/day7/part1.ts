import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day7/input.txt');
const input = readFileSync(inputPath).toString();

const equations: number[][] = []
input.split('\n').forEach(line => {
    const splitLine = line.trim().split(': ');
    const eqResult = parseInt(splitLine[0]);
    const eqNumbers = splitLine[1].split(' ').map(Number);

    const arrayToPush = [eqResult, ...eqNumbers];
    equations.push(arrayToPush);
});

let result = 0;
for (let i = 0; i < equations.length; i++) {
    const equation = equations[i];
    const arrayResult = equation[0];
    equation.shift();

    allCombinations(equation, arrayResult);
}

function allCombinations(equation: number[], correctResult: number) {
    const results: number[] = [];
    function calculation(currentValue: number, restNumbers: number[]): void {
        if (restNumbers.length === 0) {
            results.push(currentValue);
            return;
        }

        const [number, ...rest] = restNumbers;
        calculation(currentValue + number, rest);
        calculation(currentValue * number, rest);
    }

    const [firstNumber, ...rest] = equation;
    calculation(firstNumber, rest);

    if (results.includes(correctResult)) {
        result += correctResult;
    }
}

console.log('Day 7, part 1: ', result);
