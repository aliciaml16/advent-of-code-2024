import { checkInitialDifference, checkInitialDirection, checkLevel, reports } from "./common";

function checkAllReports() {
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];

        const direction = checkInitialDirection(report[0], report[1]);
        const difference = checkInitialDifference(report[0], report[1]);
        for (let n = 1; n < report.length; n++) {
            const value = report[n];
            const prevValue = report[n - 1];

            if (direction === 'invalid' || difference === 'invalid') break;
            if (checkLevel(prevValue, value, direction) === false) break;

            if (n === report.length - 1) part1result++;
        }
    }
}

let part1result = 0;
checkAllReports();

console.log('Day 2, part 1: ', part1result);