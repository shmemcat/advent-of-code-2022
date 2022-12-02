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
   // Nested object mapping
   return {
      A: {
         X: 4,
         Y: 8,
         Z: 3,
      },
      B: {
         X: 1,
         Y: 5,
         Z: 9,
      },
      C: {
         X: 7,
         Y: 2,
         Z: 6,
      },
   }[str[0]][str[1]]
}

function calculatePointsPartTwo(str) {
   // Nested object mapping
   return {
      A: {
         X: 3,
         Y: 4,
         Z: 8,
      },
      B: {
         X: 1,
         Y: 5,
         Z: 9,
      },
      C: {
         X: 2,
         Y: 6,
         Z: 7,
      },
   }[str[0]][str[1]]
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