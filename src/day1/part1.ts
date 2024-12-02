import { firstColumn, secondColumn } from "./input";

let part1result = 0;
for (let i = 0; i < firstColumn.length; i++) {
  let difference = Math.abs(firstColumn[i] - secondColumn[i]);
  part1result = part1result + difference;
}

console.log('Day 1, part 1: ', part1result);
