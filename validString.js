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

// Complete the isValid function below.
function isValid(s) {
    if(s===''){
        return 'NO';
    }
    if(s.length<=3){
        return 'YES'
    }
    //map the frequency of occurrences of letters in string
    let map = new Map(); 
    for(let i = 0; i < s.length; i++) {
        if(map.has(s[i])) {
            let c = map.get(s[i]);
            map.set(s[i],++c);
        } else {
            map.set(s[i],1);
        }
    }
    let values = [...map.values()].sort();
    console.log(values);
    
    //all frequencies are same
    if(Math.min(...values) === Math.max(...values)){
        return 'YES'
    }
    let vmap = new Map();
    for(let i = 0; i < values.length; i++) {
        if(vmap.has(values[i])) {
            let c = vmap.get(values[i]);
            vmap.set(values[i],++c);
        } else {
            vmap.set(values[i],1);
        }
    }
    console.log(vmap);
    if([...vmap.keys()].length===1){
        return 'YES'
    }
    if([...vmap.keys()].length>2){
        return 'NO'
    }
    if([...vmap.keys()].includes(1) && vmap.get(1)===1){
        return 'YES';
    }
    if([...vmap.values()].includes(1) && Math.abs([...vmap.keys()][0]-[...vmap.keys()][1])===1){
        return 'YES';
    }
    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
