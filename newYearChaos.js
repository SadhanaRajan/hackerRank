'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumBribes function below.
function minimumBribes(q) {
    let ans = 0;
    let expectedFirst = 1;
    let expectedSecond = 2;
    let expectedThird = 3;
    for (let i = 0; i < q.length; i++) {
        if (q[i] == expectedFirst) {
            expectedFirst = expectedSecond;
            expectedSecond = expectedThird;
            expectedThird++;
        } else if (q[i] == expectedSecond) {
            ans++;
            expectedSecond = expectedThird;
            expectedThird++;
        } else if (q[i] == expectedThird) {
            ans += 2;
            expectedThird++;
        } else {
            console.log("Too chaotic");
            return;
        }
    }
    console.log(ans);
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
