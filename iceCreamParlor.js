/*
Each time Sunny and Johnny take a trip to the Ice Cream Parlor, they pool their money to buy ice cream. On any given day, the parlor offers a line of flavors. Each flavor has a cost associated with it.

Given the value of MONEY and the COST of each flavor for t trips to the Ice Cream Parlor, help Sunny and Johnny choose two distinct flavors such that they spend their entire pool of money during each visit. ID numbers are the 1- based index number associated with a COST. For each trip to the parlor, print the ID numbers for the two types of ice cream that Sunny and Johnny purchase as two space-separated integers on a new line. You must print the smaller ID first and the larger ID second.

For example, there are n = 5 flavors having COST=[2,1,3,5,6]. Together they have MONEY = 5 to spend. They would purchase flavor ID's 1 and 3 for a cost of 2 + 3 = 5. Use 1 based indexing for your response.
SAMPLE INPUT
2
4
5
1 4 5 3 2
4
4
2 2 4 3


SAMPLE OUTPUT
1 4
1 2

*/

'use strict';

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

function makeMap(arr){
    let map = new Map();
    for(let i = 0; i < arr.length; i++) {
        if(map.has(arr[i])){
            let c = map.get(arr[i]);
            c.push(i)
            map.set(arr[i],c);
        } else {
            map.set(arr[i],[i]);
        }
    }
    return map;
}

// Complete the whatFlavors function below.
function whatFlavors(cost, money) {
    // console.log(money,cost)
    // console.log(makeMap(cost))
    let map = makeMap(cost);
    for(let i=0;i<cost.length;i++){
        if(cost[i]<money){
            if(map.has(money-cost[i]) && map.get(money-cost[i]).length>0) {
                if(cost[i]!==(money-cost[i])) {
                    console.log((i+1)+' '+(map.get(money-cost[i])[0]+1));
                    return;
                } else {
                    //check if same costs are present in menu
                    if(map.get(cost[i]).length>1){
                        //same costs are found in menu
                        let toPrint = map.get(money-cost[i]);
                        console.log((toPrint[0]+1)+' '+(toPrint[1]+1));
                        return;
                    }
                }
            }
        }
    }
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine(), 10);

        const n = parseInt(readLine(), 10);

        const cost = readLine().split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
