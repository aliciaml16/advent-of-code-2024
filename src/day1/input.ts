import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, '../../src/day1/input.txt');
const input = readFileSync(inputPath).toString();

export const firstColumn: number[] = [];
export const secondColumn: number[] = [];
input.split('\n').forEach(line => {
    if (line.trim()) {
        const [first, second] = line.trim().split(/\s+/).map(Number);
        firstColumn.push(first);
        secondColumn.push(second);
    }
});
firstColumn.sort();
secondColumn.sort();