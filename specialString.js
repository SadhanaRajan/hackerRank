'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the substrCount function below.
function substrCount(n, s) {
    if(s.split('').every(x=>x===s[0])) {
        return n * (n+1)/2   
    }
    let sameChar = new Array(n).fill(0);
    let result =0;
    let i=0;
    while(i < n) {
        let j=i+1;
        let sc = 1;
        while(j < n && s[i] === s[j]) {
            j++;
            sc++
        }
        result += (sc * (sc + 1) / 2); 
        sameChar[i] = sc; 
        i = j;
    }
    //for s = 'aabaaab', sameChar=[2,0,1,3,0,0,1]
    for(let j = 1; j < n; j++) {
        //trying to make sameChar=[2,2,1,3,3,3,1]
        if(s.charAt(j)===s.charAt(j-1)) {
            sameChar[j] = sameChar[j-1];
        }
        if(j < (n - 1) && s[j-1]===s[j+1] && s[j]!=s[j-1]) {
            result += Math.min(sameChar[j-1],sameChar[j+1]);
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the substrCount function below.
function substrCount(n, s) {
    if(s.split('').every(x=>x===s[0])) {
        return n * (n+1)/2   
    }
    let sameChar = new Array(n).fill(0);
    let result =0;
    let i=0;
    while(i < n) {
        let j=i+1;
        let sc = 1;
        while(j < n && s[i] === s[j]) {
            j++;
            sc++
        }
        result += (sc * (sc + 1) / 2); 
        sameChar[i] = sc; 
        i = j;
    }
    //for s = 'aabaaab', sameChar=[2,0,1,3,0,0,1]
    for(let j = 1; j < n; j++) {
        //trying to make sameChar=[2,2,1,3,3,3,1]
        if(s.charAt(j)===s.charAt(j-1)) {
            sameChar[j] = sameChar[j-1];
        }
        if(j < (n - 1) && s[j-1]===s[j+1] && s[j]!=s[j-1]) {
            result += Math.min(sameChar[j-1],sameChar[j+1]);
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
