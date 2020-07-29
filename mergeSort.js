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

function merge(a, b) {
  let i = 0
  let j = 0
  let temp = []
  let count = a.count + b.count
  while(i < a.arr.length && j < b.arr.length) {
    if(a.arr[i] > b.arr[j]) {
      temp.push(b.arr[j])
      j++
      count += a.arr.length - i
    } else {
      temp.push(a.arr[i])
      i++
    }
  }
  temp = [...temp, ...a.arr.slice(i), ...b.arr.slice(j)]
  return {arr: temp, count }
}
function mergeSort(obj) {
  if(obj.arr.length === 1) {
    return obj
  }
  let middle = Math.floor(obj.arr.length/2)
  let left = {arr: obj.arr.slice(0, middle), count: obj.count}
  let right = {arr: obj.arr.slice(middle), count: obj.count}
  let result = merge(mergeSort(left), mergeSort(right))
  return result
}

// Complete the countInversions function below.
function countInversions(arr) {
    console.log('Input Array: ['+arr+']');
    let answer = mergeSort({arr, count: 0})
    console.log('Sorted Array: ['+answer.arr+'] , SWAP count = '+ answer.count)
    return answer.count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
