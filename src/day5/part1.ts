import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day5/input.txt');
const input = readFileSync(inputPath).toString();

export const rules: number[][] = [];
export const updates: number[][] = [];
input.split('\n').forEach(line => {
    if (line.includes('|')) {
        rules.push(line.trim().split('|').map(Number));
    } else if (line.includes(',')) {
        updates.push(line.trim().split(',').map(Number));
    }
});

let correctUpdates: number[][] = [];
for (let u = 0; u < updates.length; u++) {
    for (let r = 0; r < rules.length; r++) {
        const rule = rules[r];
        const update = updates[u];

        if (update.includes(rule[0]) && update.includes(rule[1])) {
            if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
                break;
            }
        }

        if (r === rules.length - 1) {
            correctUpdates.push(update);
        }
    }
}

let result = 0;
correctUpdates.map(update => {
    let middle = update[Math.round((update.length - 1) / 2)];
    result += middle;
})

console.log('Day 5, part 1: ', result);