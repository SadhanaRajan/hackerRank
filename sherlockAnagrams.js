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

function getAllSubstrings(s){
    let result = [];
    for(let i=0;i<s.length;i++){
        for(let j=i+1;j<s.length+1;j++){
            result.push(s.slice(i,j))
        }
    }
    return result;
}

function checkAnagrams(s1, s2){
    if(s1.length!==s2.length){
        return false;
    }
    let m1 = new Map();
    for(let i=0;i<s1.length;i++){
        if(m1.has(s1[i])){
            let count = m1.get(s1[i]);
            m1.set(s1[i],++count);
        } else {
            m1.set(s1[i],1);
        }
    }
    //check s2 with s1 MAP
    for(let i=0;i<s2.length;i++){
        if(m1.has(s2[i]) && m1.get(s2[i])>0){
            let count = m1.get(s2[i]);
            m1.set(s2[i],--count);
        } else {
            return false
        }
    }
    return true
}

function countAnagrams(index,allSubStrings){
    let count =0;
    const currentString = allSubStrings[index]
    const arrRest = allSubStrings.slice(index + 1)
    for (let i = 0; i < arrRest.length; i++) {
        if ( checkAnagrams(currentString, arrRest[i])) {
            count++;
        }
    }
    return count;
}

// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
    //get all substrings
    let allSubStrings = getAllSubstrings(s)
    //check if there 2 strings are ANAGRAMS
    //use checkAnagrams function check all substrings and count all anagram PAIRS
    let count =0;
    for(let i=0;i<allSubStrings.length;i++){
        count += countAnagrams(i,allSubStrings);
    }
    return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}
