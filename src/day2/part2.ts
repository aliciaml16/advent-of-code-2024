import { checkInitialDifference, checkInitialDirection, checkLevel, reports } from "./common";

function checkAllReports() {
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];

        const direction = checkInitialDirection(report[0], report[1]);
        const difference = checkInitialDifference(report[0], report[1]);
        for (let n = 1; n < report.length; n++) {
            const value = report[n];
            const prevValue = report[n - 1];

            if (direction === 'invalid' || difference === 'invalid') {
                checkPartialReports(report);
                break;
            };
            if (checkLevel(prevValue, value, direction) === false) {
                checkPartialReports(report);
                break;
            };

            if (n === report.length - 1) part2result++;
        }
    }
}

function checkPartialReports(report: number[]) {
    const fullReport = report;
    let safeReport = false;
    for (let i = 0; i < report.length; i++) {
        const partialReport = [
            ...fullReport.slice(0, i),
            ...fullReport.slice(i + 1)
        ];

        if (safeReport === true) {
            part2result++;
            safeReport = false;
            break;
        };

        const direction = checkInitialDirection(partialReport[0], partialReport[1]);
        const difference = checkInitialDifference(partialReport[0], partialReport[1]);
        for (let n = 1; n < partialReport.length; n++) {
            const value = partialReport[n];
            const prevValue = partialReport[n - 1];

            if (direction === 'invalid' || difference === 'invalid') break;
            if (checkLevel(prevValue, value, direction) === false) break;

            if (n === partialReport.length - 1) safeReport = true;
        }
    }
}

let part2result = 0;
checkAllReports();

console.log('Day 2, part 2: ', part2result);