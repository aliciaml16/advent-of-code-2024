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

function checkIncorrectUpdates(upd: number[][]) {
    let newUpdates: number[][] = [];

    for (let u = 0; u < upd.length; u++) {
        for (let r = 0; r < rules.length; r++) {
            const rule = rules[r];
            const update = upd[u];

            if (update.includes(rule[0]) && update.includes(rule[1])) {
                if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
                    newUpdates.push(update);
                    break;
                }
            }
        }
    }

    if (newUpdates.length > 0) {
        organiseUpdates(newUpdates);
    }
    return newUpdates;
}

function organiseUpdates(upd: number[][]) {
    let newUpdates: number[][] = [];
    for (let u = 0; u < upd.length; u++) {
        for (let r = 0; r < rules.length; r++) {
            const rule = rules[r];
            const update = upd[u];

            if (update.includes(rule[0]) && update.includes(rule[1])) {
                if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
                    const indexOfRule1 = update.indexOf(rule[0]);
                    const indexOfRule2 = update.indexOf(rule[1]);
                    update.splice(indexOfRule2, 0, update.splice(indexOfRule1, 1)[0]);
                    newUpdates.push(update);
                }
            }
        }
    }

    checkIncorrectUpdates(newUpdates);
}

let result = 0;
const finalUpdates: number[][] = checkIncorrectUpdates(updates);

finalUpdates.map(update => {
    let middle = update[Math.round((update.length - 1) / 2)];
    result += middle;
})

console.log('Day 5, part 2: ', result);