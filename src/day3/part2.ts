import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, '../../src/day3/input.txt');
const input = readFileSync(inputPath).toString();

const regex = /(?:do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g;
const matches = input.match(regex);

let result = 0;
let instruction = 'do';
matches?.forEach(value => {
    if (value === "don't()") instruction = 'dont';
    if (value === "do()") instruction = 'do';

    if (instruction === 'do' && value !== "do()" && value !== "don't()") {
        const split1 = value.split('(')
        const split2 = split1[1].split(',')
        const split3 = split2[1].split(')')

        const firstNumber = parseInt(split2[0]);
        const secondNumber = parseInt(split3[0]);

        result = result + (firstNumber * secondNumber)
    }
})

console.log('Day 3, part 2: ', result);