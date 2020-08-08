/*
Find the largest rectangular area possible in a given histogram where the largest rectangle can be made of a number of contiguous bars. For simplicity, assume that all bars have same width and the width is 1 unit.
For example, consider the following histogram with 7 bars of heights {6, 2, 5, 4, 5, 1, 6}. The largest possible rectangle possible is 12
*/

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

function top(stack){
    return stack[stack.length-1]
}

// Complete the largestRectangle function below.
function largestRectangle(h) {
    let posStack = [];
    let heightStack = [];
    let max = 0;
    let size=0; let temph; let tempi; let i;
    let popIt = function(){
        temph = heightStack.pop();
        tempi = posStack.pop();
        size = temph * (i-tempi);
        if(size > max){
            max = size;
        }
    }
    for(i=0;i<h.length;i++){
        if(heightStack.length===0||h[i]>top(heightStack)){
            heightStack.push(h[i]);
            posStack.push(i);
        } else {
            while(heightStack.length && h[i]<top(heightStack)){
                popIt()
            }
            heightStack.push(h[i]);
            posStack.push(tempi);
        }
    }
    while(heightStack.length){
        popIt()
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

    let result = largestRectangle(h);

    ws.write(result + "\n");

    ws.end();
}
