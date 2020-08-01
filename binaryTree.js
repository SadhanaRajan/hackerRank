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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
    /*
     * Write your code here.
     */

    const Node = (value, depth) => ({value: value, depth: depth});
    let tree = [Node(1, 1)];
    const addNode = (value, depth) => {
        if(value !== -1){
            tree.push(Node(value, depth));
        }
    }
    for(let i = 0; i < indexes.length; i ++){
        // Reading left & right values
        let left  = indexes[i][0];
        let right = indexes[i][1];
        
        // Getting current depth of the tree
        let depth = tree[i].depth;
        
        // Adding the new nodes to tree
        addNode(left,  depth + 1);
        addNode(right, depth + 1);

        // Assigning new children to current node
        tree[i].left  = left;
        tree[i].right = right;
        
    }
    console.log(tree);
    const swap = (t,d) => {
        let tree = [...t];
        for(let i = 0; i < tree.length; i ++){
            if(tree[i].depth % d === 0){
                [tree[i].left, tree[i].right] = [tree[i].right, tree[i].left];
            }
        }
        return tree;
    }
    let result = []
    const inOrderTraversal = (node, tree) => {
    
        let nextLeftNode  = tree[node - 1].left;
        let nextRightNode = tree[node - 1].right;
        
        // 1. Print left children 
        if(nextLeftNode !== -1) 
            inOrderTraversal(nextLeftNode, tree);
        
        // 2. Print own value
        // console.log(node)
        result.push(node);
        
        // 3. Print right children
        if(nextRightNode !== -1) 
            inOrderTraversal(nextRightNode, tree);

    }
    let masterResult = [];
    for(let i=0;i<queries.length;i++){
        result = [];
        inOrderTraversal(1,swap(tree,queries[i]));
        masterResult.push(result)
    }
    return masterResult
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = swapNodes(indexes, queries);

    ws.write(result.map(x => x.join(' ')).join("\n") + "\n");

    ws.end();
}
