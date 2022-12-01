// Imports
import { readFileSync } from 'node:fs';

// Read input
const input = readFileSync("./input.txt", {encoding: "UTF-8"} );

// Split input on newline
const inputSplit = input.split("\n")

// Convert strings to integers
let inputArray = [];
for(let i = 0; i < inputSplit.length; i++) {
   inputArray.push(parseInt(inputSplit[i]));
}

// Group numbers into an array of arrays using NaN as delimeter
let tempArray = [];
let groupedInputArray = [];
inputArray.map(x => {
   if(x) {
      tempArray.push(x)
   }
   else {
      groupedInputArray.push(tempArray)
      tempArray = []
   }
})

// Sum together the total value of each array within the array
let summedArray = []
groupedInputArray.map(y => { summedArray.push(y.reduce((acc, curr) => acc + curr, 0)); })

// Find the max value using spread operator
let highestCalorie = Math.max(...summedArray);
console.log(highestCalorie);