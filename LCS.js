//Longest Common Sequence
'use strict';

const fs = require('fs');

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

function makeMap(arr){
    let map = new Map();
    for(let i=0;i<arr.length;i++){
        if(map.has(arr[i])){
            let c = map.get(arr[i]);
            map.set(arr[i],++c);
        }else{
            map.set(arr[i],1)
        }
    }
    return map;
}

function LCSLength(X,Y) {
    let m=X.length;
    let n=Y.length;
    let C = [];
    for (let i = 0; i <= m; i++) C.push([0]);
    for (let j = 0; j <= n; j++) C[0].push(0);
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(X[i-1]===Y[j-1]){
                C[i][j] = C[i-1][j-1] + 1
            } else {
                C[i][j] = Math.max(C[i][j-1], C[i-1][j]);
            }
        }
    }
    return C[m][n];
}

// Complete the commonChild function below.
function commonChild(s1, s2) {
    return LCSLength(s1.split(''),s2.split(''))
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
