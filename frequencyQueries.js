'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the freqQuery function below.
function freqQuery(queries) {
    let result = [];
    let map = new Map(); //map occurences of elements
    let freq = []; 
    //[0,2,5] there are 2 numbers that appears once and 5 numbers that appear twice
    for(let i=0;i<queries.length;i++) {
        const operation = queries[i][0];
        const value = queries[i][1];
        const initValue = map.get(value) || 0;
        if(operation===1) {
            if(map.has(value) && map.get(value)>0) {
                let c = map.get(value);
                map.set(value,++c);
            } else {
                map.set(value,1);
            }
            //adding a value - means decrement current freq and increment next freq 
            freq[initValue] = (freq[initValue] || 0) - 1;
            freq[initValue + 1] = (freq[initValue + 1] || 0) + 1;
        } else if(operation===2) {
            if(map.has(value) && map.get(value)>0) {
                let c = map.get(value);
                map.set(value,--c);
            }
            //deleting a value - means increment prev freq and decrement current freq 
            freq[initValue - 1] += 1;
            freq[initValue] = (freq[initValue] || 0) - 1;
        } else if(operation===3) {
            if(freq[value]){
                result.push(1);
            }else{
                result.push(0);
            }
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
