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

function countTriplets(arr,r){
    const map1 = new Map(); // map the occurences of elements in arr
    const map2 = new Map(); // map occurences of middle element of potential triplet
    let count = 0; //count of vetted triplets (vetted 3rd elements)
    if (arr.length < 3) {
        return 0;
    }
    for (let i = arr.length - 1; i >=0; i--) {
        let t1 = arr[i];
        let t2 = t1 * r;
        let t3 = t2 * r;
        if(map2.has(t3)){
            count += map2.get(t3)
        }
        map2.has(t2) ? 
            map2.set(t2,map2.get(t2)+(map1.get(t2)||0)) :
            map2.set(t2,(map1.get(t2)||0));
        map1.has(t1) ?
            map1.set(t1,map1.get(t1)+1) :
            map1.set(t1,1)
    }
  return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
