/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", { encoding: "UTF-8" });

/* ------------------ DATA FUNCTIONS ------------------ */
// parse data to array
// if there are two consecutive spaces, there is a gap in the data
function parseCrateDiagram(crateLines) {
   let crateArrayTemp = [];
   let row = 0;
   for (const line of crateLines) {
      let spaceFlag = true;
      for (let i = 0; i < line.length; i++) {
         if (line[i] != " ") {
            crateArrayTemp.push(line[i]);
            spaceFlag = false;
         }
         else if (spaceFlag) {
            crateArrayTemp.push("");
            i += 3;
         }
         else {
            spaceFlag = true;
         }
      }
      row++;
   }
   return crateArrayTemp;
}

// split array into 2d array given a width
function chunkArray(array, width) {
   let resultArray = [];
   while (array.length) {
      resultArray.push(array.splice(0, width));
   }
   return resultArray;
}

// transpose array to be usable and remove empty entries
function transposeArray(array) {
   var transposedArray = [];

   for (var i = 0; i < array[0].length; i++) {
      transposedArray[i] = [];
      for (var j = array.length - 1; j >= 0; j--) {
         transposedArray[i][array.length - 1 - j] = array[j][i];
      }
   }
   let transposedArraySpliced = transposedArray.map(row => row.filter(item => item));
   return transposedArraySpliced;
}

// rearranges array given a procedure list of instructions formatted as such:
// # of crates to move, # of start column, # of end column
function crateRearrangement(array, procedure) {
   for (const pline of procedure) {
      var cratesToMove = pline[0];
      var startRow = pline[1] - 1; // accounting for indexing
      var endRow = pline[2] - 1; // accounting for indexing

      for (let i = 1; i <= cratesToMove; i++) {
         var movedCrate = array[startRow].pop();
         array[endRow].push(movedCrate);
      }
   }
   return array;
}

// rearranges array given a procedure list of instructions formatted as such:
// # of crates to move, # of start column, # of end column
function crateMover9001(array, procedure) {
   for (const pline of procedure) {
      var cratesToMove = pline[0];
      var startRow = pline[1] - 1; // accounting for indexing
      var endRow = pline[2] - 1; // accounting for indexing

      var movedCrates = array[startRow].splice(array[startRow].length - cratesToMove, cratesToMove);
      array[endRow] = array[endRow].concat(movedCrates);
   }
   return array;
}

/* ------------------ PARSING ------------------ */

// split input into crates and procedure
const inputSplit = input.split("\n\n");
const crates = inputSplit[0];
const procedure = inputSplit[1];

// parse crates into array
const crateLines = crates.split("\n");

// grab the width of the array from the last row
const crateArrayLastLine = crateLines.pop().slice(1, -1).split(/\s+/).map(x => parseInt(x)); // grab last row, split and parse to numbers
const crateArrayWidth = crateArrayLastLine.reduce((acc, curr) => Math.max(acc, curr), 0); // find the highest number

// remove the brackets
const crateLinesClean = crateLines.map(element => element.replace(/[\[\]]/g, "")); // remove the brackets

// parse into a usable array
const crateArrayUnsplit = parseCrateDiagram(crateLinesClean);
const crateArrayUntransposed = chunkArray(crateArrayUnsplit, crateArrayWidth);
const crateArray = transposeArray(crateArrayUntransposed);

// parse procedure into readable input for the rearranging
const parsedProcedure = procedure.split("\n").map(row => row.match(/\d+/g).map(x => parseInt(x)));

/* ------------------ SOLUTION FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const rearrangedCrateArray = crateRearrangement(crateArray, parsedProcedure);
   const topRow = (rearrangedCrateArray.map(row => row.pop())).join("");
   console.log(`Part One Solution: ${topRow}`);
}

// Solve Part Two Function
function solvePartTwo() {
   const rearrangedCrateArray9001 = crateMover9001(crateArray, parsedProcedure);
   const topRow9001 = (rearrangedCrateArray9001.map(row => row.pop())).join("");
   console.log(`Part Two Solution: ${topRow9001}`);
}

//solvePartOne();
solvePartTwo();