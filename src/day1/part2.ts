import { firstColumn, secondColumn } from "./input";

let part2result = 0;

for (let i = 0; i < firstColumn.length; i++) {
  let numberOfRepetitions = secondColumn.filter((value) => value === firstColumn[i]);
  if (numberOfRepetitions.length > 0) {
    let numberValue = firstColumn[i] * numberOfRepetitions.length;
    part2result = part2result + numberValue;
  }
}

console.log('Day 1, part 2: ', part2result);
