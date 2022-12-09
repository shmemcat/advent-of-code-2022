/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", { encoding: "UTF-8" });

/* ------------------ DATA FUNCTIONS ------------------ */
function findVisibleTrees(grid) {
   // initialize an array to store the visible trees
   let visibleTrees = [];

   // iterate over the rows and columns of the grid
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
         // check if the current tree is the largest in its row or column, or if it's on the outside
         if (seenFromNorth(grid, row, col) || seenFromWest(grid, row, col) || seenFromEast(grid, row, col) || seenFromSouth(grid, row, col)) {
            // if the tree is the largest, add it to the list of visible trees
            visibleTrees.push([row, col]);
         }
      }
   }
   return visibleTrees;
}

function seenFromNorth(grid, row, col) {
   let largest = grid[row][col];
   if (row === 0) { return true; } // it can be seen no matter what because it's an edge tree
   for (let r = 0; r < row; r++) {
      if (grid[r][col] >= largest) {
         return false; // a larger or same height tree was found
      }
   }
   return true; // no larger trees were found
}

function seenFromWest(grid, row, col) {
   let largest = grid[row][col];
   if (col === 0) { return true; } // it can be seen no matter what because it's an edge tree
   for (let c = 0; c < col; c++) {
      if (grid[row][c] >= largest) {
         return false; // a larger or same height tree was found
      }
   }
   return true; // no larger trees were found
}

function seenFromEast(grid, row, col) {
   let largest = grid[row][col];
   if (col === grid[0].length - 1) { return true; } // it can be seen no matter what because it's an edge tree
   for (let c = col + 1; c < grid[0].length; c++) {
      if (grid[row][c] >= largest) {
         return false; // a larger or same height tree was found
      }
   }
   return true; // no larger trees were found
}

function seenFromSouth(grid, row, col) {
   let largest = grid[row][col];
   if (row === grid.length - 1) { return true; } // it can be seen no matter what because it's an edge tree
   for (let r = row + 1; r < grid.length; r++) {
      if (grid[r][col] >= largest) {
         return false; // a larger or same height tree was found
      }
   }
   return true; // no larger trees were found
}

function calculateScenicScore(grid) {
   // initialize an array to store the visible trees
   let scores = [];

   // iterate over the rows and columns of the grid
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
         // calculate the trees scenic score
         let treeScore = scoreFromNorth(grid, row, col) * scoreFromWest(grid, row, col) * scoreFromEast(grid, row, col) * scoreFromSouth(grid, row, col);
         scores.push(treeScore);
      }
   }
   return scores;
}

function scoreFromNorth(grid, row, col) {
   let score = 0;
   let tree = grid[row][col];
   if (row === 0) { return 0; } // edge tree
   for (let r = row - 1; r >= 0; r--) {
      if (grid[r][col] < tree) {
         score += 1; // the tree can be seen and seen beyond
      }
      else if (grid[r][col] >= tree) {
         score += 1; // the tree can be seen but not beyond
         return score;
      }
   }
   return score; // it can see all the trees! neat!
}

function scoreFromWest(grid, row, col) {
   let score = 0;
   let tree = grid[row][col];
   if (col === 0) { return 0; } // edge tree
   for (let c = col - 1; c >= 0; c--) {
      if (grid[row][c] < tree) {
         score += 1; // the tree can be seen and seen beyond
      }
      else if (grid[row][c] >= tree) {
         score += 1; // the tree can be seen but not beyond
         return score;
      }
   }
   return score; // it can see all the trees! neat!
}

function scoreFromEast(grid, row, col) {
   let score = 0;
   let tree = grid[row][col];
   if (col === grid[0].length - 1) { return 0; } // edge tree
   for (let c = col + 1; c < grid[0].length; c++) {
      if (grid[row][c] < tree) {
         score += 1; // the tree can be seen and seen beyond
      }
      else if (grid[row][c] >= tree) {
         score += 1; // the tree can be seen but not beyond
         return score;
      }
   }
   return score; // it can see all the trees! neat!
}

function scoreFromSouth(grid, row, col) {
   let score = 0;
   let tree = grid[row][col];
   if (row === grid.length - 1) { return 0; } // edge tree
   for (let r = row + 1; r < grid.length; r++) {
      if (grid[r][col] < tree) {
         score += 1; // the tree can be seen and seen beyond
      }
      else if (grid[r][col] >= tree) {
         score += 1; // the tree can be seen but not beyond
         return score;
      }
   }
   return score; // it can see all the trees! neat!
}

/* ------------------ PARSING ------------------ */

// Split input into 2d array
const treeArray = input.split("\n").map(function (line) { return [line]; }).map(str => str[0].split("").map(function (element) { return parseInt(element); }));
//console.log(treeArray);

/* ------------------ SOLUTION FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const visibleTreeArray = findVisibleTrees(treeArray);
   const numberOfVisibleTrees = visibleTreeArray.length; // find the number of visible trees
   console.log(`Part One Solution: ${numberOfVisibleTrees}`);
}

// Solve Part Two Function
function solvePartTwo() {
   const scenicScoreArray = calculateScenicScore(treeArray);
   const highestScenicScore = scenicScoreArray.reduce((acc, curr) => Math.max(acc, curr), 0); // find highest scenic score possible
   console.log(`Part Two Solution: ${highestScenicScore}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();