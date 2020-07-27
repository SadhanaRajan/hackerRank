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

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let swaps = 0;

    //boolean array to know if element is visited or not
    let visitedArray = arr.map(x=>x<1);

    //hash map for key and values
    let hashMap = new Map()
    arr.map(x=>hashMap.set(arr.indexOf(x),x));

    //solution
    for(let i=0;i<arr.length;i++){
        //if number is visited or in its correct place
        if(visitedArray[i] || arr[i] === i+1){
            continue;
        }
        let cycleSize = 0;
        let current = i;
        //cycle ends when you find an element that it already visited
        while(!visitedArray[current]){
            visitedArray[current]=true;
            cycleSize++;
            current=(hashMap.get(current))-1;
        }
        // Increase Swaps by adding current cycle. 
        if(cycleSize > 0) { 
            swaps += (cycleSize - 1); 
        } 
    }
    return swaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
