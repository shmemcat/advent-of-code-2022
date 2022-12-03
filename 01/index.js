/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", {encoding: "UTF-8"} );

// Split input on newline
const inputSplit = input.split("\n\n")
let inputGroups = []
for(let i = 0; i < inputSplit.length; i++) {
   inputGroups.push(inputSplit[i].split("\n"));
}

// Convert strings to integers
let summedArray = [];
for(let i = 0; i < inputGroups.length; i++) {
   let temp = 0;
   for(let j = 0; j < inputGroups[i].length; j++) {
      temp += parseInt(inputGroups[i][j]);
   }
   summedArray.push(temp);
}

/* ------------------ FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   // Find the max value using spread operator
   let highestCalorie = Math.max(...summedArray);
   console.log(`Part One Solution: ${highestCalorie}`);
}

// Solve Part Two Function
function solvePartTwo() {
   // Sort the summed array, slice off the 3 highest values, and add them
   let tempTopThree = summedArray.sort((a, b) => a - b).slice(-3);
   let totalTopThree = tempTopThree.reduce((acc, curr) => acc + curr, 0);
   console.log(`Part Two Solution: ${totalTopThree}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();