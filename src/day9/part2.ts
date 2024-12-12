import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, '../../src/day9/input.txt');
const input = readFileSync(inputPath).toString();

const diskMap = input.split('');
let orderedDiskMapArray: (number | string)[][] = [];
let newDisk: (number | string)[][] = [];
diskMap.forEach((value, index) => {
    if (index % 2 == 0) {
        const diskIndex = index / 2;
        orderedDiskMapArray.push(Array(parseInt(value)).fill(diskIndex));
        newDisk.push(Array(parseInt(value)).fill(diskIndex));
    } else {
        if (parseInt(value) > 0) {
            orderedDiskMapArray.push(Array(parseInt(value)).fill('.'));
            newDisk.push(Array(parseInt(value)).fill('.'));
        }
    }
});

function replaceString() {
    for (let i = orderedDiskMapArray.length - 1; i > 0; i--) {
        if (!orderedDiskMapArray[i].includes('.') && orderedDiskMapArray[i].length > 0) {
            const value = orderedDiskMapArray[i];

            for (let m = 0; m < orderedDiskMapArray.length; m++) {
                const freeSpace = orderedDiskMapArray[m].length;
                if (orderedDiskMapArray[m].includes('.') && value.length <= freeSpace && i > m) {
                    const numberGroup = value;
                    const dotGroup = newDisk[m];
                    const dotGroupLength = dotGroup.filter(value => value === '.').length;
                    const extraSpace = dotGroupLength - numberGroup.length;

                    if (extraSpace > 0) {
                        orderedDiskMapArray[m] = Array(extraSpace).fill('.');
                    } else {
                        orderedDiskMapArray[m] = [];
                    }
                    newDisk[i] = Array(numberGroup.length).fill('.');
                    let replacementIndex = 0;
                    const newNumberGroup = dotGroup.map(item => {
                        if (item === '.' && replacementIndex < numberGroup.length) {
                            return numberGroup[replacementIndex++];
                        }
                        return item;
                    });
                    newDisk[m] = newNumberGroup;
                    break;
                }
            }
        }
    }
}

replaceString();
const joinedDisk = newDisk.flat();

let result = 0;
joinedDisk.forEach((value, index) => {
    if (typeof value === 'number') {
        result += value * index;
    }
})

console.log('Day 9, part 2: ', result);
