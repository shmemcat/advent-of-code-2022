/* ------------------ IMPORTS ------------------ */
import { readFileSync } from 'node:fs';

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", {encoding: "UTF-8"} );

// split input strings in half
function halve(str) {
   let temp = [];
   temp.push(str.slice(0, str.length / 2));
   temp.push(str.slice(str.length / 2, str.length));
   return temp;
}

// convert to ascii and offset to get value
function getPriority(c) {
   // if character is upper case, convert to ascii and subtract a offset
   if(c == c.toUpperCase()) {
      return (c.charCodeAt(0) - 38);
   }
   // else character is lower case, convert to ascii and subtract offset
   else {
      return (c.charCodeAt(0) - 96);
   }
}

// convert any number of arrays into sets to find the intersection using reduction and filtering
function findIntersection(array) {
   let setArray = array.map(x => new Set(x));
   var intersect = setArray.reduce((a, b) => new Set([...a].filter(x => b.has(x))));
   return [...intersect];
}

/* ------------------ FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const inputGroups1 = input.split("\n").map(str => halve(str));  // Split and group input
   const filteredArray = inputGroups1.map(str => findIntersection(str));  // convert each array into sets to find the intersection using filtering
   const totalPointsArray = filteredArray.map(str => getPriority(str[0]));  // convert to ascii and offset to get value
   const totalPoints = totalPointsArray.reduce((acc, curr) => acc + curr, 0);  // add up all the values in the array
   
   console.log(`Part One Solution: ${totalPoints}`);
}

// Solve Part Two Function
function solvePartTwo() {
   const inputGroups2 = input.split("\n");  // Split input

   // group input every 3 lines
   const chunkSize = 3;
   let elfGroups = []
   for (let i = 0; i < inputGroups2.length; i += chunkSize) {
      elfGroups.push(inputGroups2.slice(i, i + chunkSize));
   }

   const filteredElfGroupsArray = elfGroups.map(strGrp => findIntersection(strGrp));  // convert each array into sets to find the intersection using filtering
   const totalPointsElvesArray = filteredElfGroupsArray.map(str => getPriority(str[0]));  // convert to ascii and offset to get value
   const totalPointsElves = totalPointsElvesArray.reduce((acc, curr) => acc + curr, 0);  // add up all the values in the array

   console.log(`Part Two Solution: ${totalPointsElves}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();