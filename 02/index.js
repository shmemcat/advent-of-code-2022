/* ------------------ IMPORTS ------------------ */
import { readFileSync } from 'node:fs';

/* ------------------ READ INPUT ------------------ */

// ROCK    : A, 1
// PAPER   : B, 2
// SCISSORS: C, 3
// LOSE: 0, X
// DRAW: 3, Y
// WIN : 6, Z

const input = readFileSync("./input.txt", {encoding: "UTF-8"} );

function calculatePointsPartOne(str) {
   var tempPoints = 0;
   if (str[0] === "A") { if(str[1] === "X") { tempPoints = 4 } else if(str[1] === "Y") { tempPoints = 8 } else { tempPoints = 3 }} 
   else if (str[0] === "B") { if(str[1] === "X") { tempPoints = 1 } else if(str[1] === "Y") { tempPoints = 5 } else { tempPoints = 9 }} 
   else if (str[0] === "C") { if(str[1] === "X") { tempPoints = 7 } else if(str[1] === "Y") { tempPoints = 2 } else { tempPoints = 6 }} 
 
   return tempPoints;
}

function calculatePointsPartTwo(str) {
   var tempPoints = 0;
   if (str[0] === "A") { if(str[1] === "X") { tempPoints = 3 } else if(str[1] === "Y") { tempPoints = 4 } else { tempPoints = 8 }} 
   else if (str[0] === "B") { if(str[1] === "X") { tempPoints = 1 } else if(str[1] === "Y") { tempPoints = 5 } else { tempPoints = 9 }} 
   else if (str[0] === "C") { if(str[1] === "X") { tempPoints = 2 } else if(str[1] === "Y") { tempPoints = 6 } else { tempPoints = 7 }} 
 
   return tempPoints;
}

// Split and group input
let inputGroups = input.split("\n").map(n => n.split(" "))

/* ------------------ FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   var arrayPoints = inputGroups.map(calculatePointsPartOne)
   var totalPoints = arrayPoints.reduce((acc, curr) => acc + curr, 0)
   console.log(`Part One Solution: ${totalPoints}`);
}

// Solve Part Two Function
function solvePartTwo() {
   var arrayPoints = inputGroups.map(calculatePointsPartTwo)
   var totalPoints = arrayPoints.reduce((acc, curr) => acc + curr, 0)
   console.log(`Part Two Solution: ${totalPoints}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne()
solvePartTwo()