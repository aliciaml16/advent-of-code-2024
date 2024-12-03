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
    for (let i = 0; i < report.length; i++) {
        const partialReport = [
            ...fullReport.slice(0, i),
            ...fullReport.slice(i + 1)
        ];

        const direction = checkInitialDirection(partialReport[0], partialReport[1]);
        const difference = checkInitialDifference(partialReport[0], partialReport[1]);

        let safeReport = true;
        for (let n = 1; n < partialReport.length; n++) {
            const value = partialReport[n];
            const prevValue = partialReport[n - 1];

            if (direction === 'invalid' || difference === 'invalid') { safeReport = false; break; };
            if (checkLevel(prevValue, value, direction) === false) { safeReport = false; break; };
        }

        if (safeReport) {
            part2result++;
            break;
        }
    }
}

let part2result = 0;
checkAllReports();

console.log('Day 2, part 2: ', part2result);