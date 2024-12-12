import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day9/input.txt');
const input = readFileSync(inputPath).toString();

const diskMap = input.split('');
const orderedDiskMapArray: string[] = [];
diskMap.forEach((value, index) => {
    if (index % 2 == 0) {
        const diskIndex = index / 2;
        for (let i = 0; i < parseInt(value); i++) {
            orderedDiskMapArray.push(diskIndex.toString());
        }
    } else {
        for (let i = 0; i < parseInt(value); i++) {
            orderedDiskMapArray.push('.');
        }
    }
})

let separatedDisk: string[] = orderedDiskMapArray;

let numberOfDots = separatedDisk.filter(char => char === '.').length;
separatedDisk.forEach((char, index) => {
    if (char === '.' && index < separatedDisk.length - numberOfDots) {
        replaceString(index);
    }
});

function replaceString(pos: number) {
    const arr = separatedDisk;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== '.') {
            arr[pos] = arr[i];
            arr[i] = '.';
            separatedDisk = arr;
            break;
        }
    }
}

let result = 0;
separatedDisk.forEach((value, index) => {
    if (value !== '.') {
        result += parseInt(value) * index;
    }
})

console.log('Day 9, part 1: ', result);
