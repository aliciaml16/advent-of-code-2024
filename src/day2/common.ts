import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve(__dirname, '../../src/day2/input.txt');
const input = readFileSync(inputPath).toString();

export const reports: number[][] = [];
input.split('\n').forEach(line => {
    if (line.trim()) {
        reports.push(line.trim().split(/\s+/).map(Number))
    }
});

export function checkInitialDirection(value1: number, value2: number) {
    if (value1 > value2) return 'dec';
    if (value1 < value2) return 'inc';
    return 'invalid';
}

export function checkInitialDifference(value1: number, value2: number) {
    if (Math.abs(value1 - value2) > 0 && Math.abs(value1 - value2) < 4) return 'valid';
    return 'invalid';
}

export function checkLevel(value1: number, value2: number, prevValue: 'dec' | 'inc') {
    const dirCheck = prevValue === 'dec' ? value1 > value2 : value1 < value2;
    const diffCheck = Math.abs(value1 - value2) > 0 && Math.abs(value1 - value2) < 4;

    if (dirCheck && diffCheck) return true;

    return false;
}