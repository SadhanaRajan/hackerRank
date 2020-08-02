/*
You are planning production for an order. You have a number of machines that each have a fixed number of days to produce an item.
Given that all the machines operate simultaneously, determine the minimum number of days to produce the required order.

For example, you have to produce goal=10 items. You have three machines that take machines=[2,3,2] days to produce an item.
The following is a schedule of items produced:

Day Production  Count
2   2               2
3   1               3
4   2               5
6   3               8
8   2              10

It takes 8 days to produce 10 items using these machines.
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

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minTime function below.
function minTime(machines, goal) {

    let n = machines.length;
    machines = machines.sort((a,b)=>{return a-b});
    let max = machines[n-1]*goal;
    let min =0;
    let result = -1
    while(max > min){
        console.log('searching '+[min,max])
        let midValue = Math.floor((max + min) / 2);
        console.log('mid ' + midValue)
        let unit = 0;
        for(let i=0;i<n;i++){
            unit += Math.floor( midValue / machines[i]);
        } 
        console.log('unit '+unit+' goal '+goal)
        if(unit < goal) {
            min = midValue + 1;
            result = midValue + 1;
        } else  {
            max = midValue;
            result = midValue; 
        }
    }
    return result; 
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nGoal = readLine().split(' ');

    const n = parseInt(nGoal[0], 10);

    const goal = parseInt(nGoal[1], 10);

    const machines = readLine().split(' ').map(machinesTemp => parseInt(machinesTemp, 10));

    const ans = minTime(machines, goal);

    ws.write(ans + '\n');

    ws.end();
}
