/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", { encoding: "UTF-8" });

// Split input in groups of pairs and parse into ints
const inputGroups = input.split("\n").map(str => str.split(",").map(pair => pair.split("-").map(str => parseInt(str))));

// takes two pairs and determines if either pair's range is fully contained within the other
function doesRangeFullyContain(pairs) {
   const pairs1 = pairs[0];
   const pairs2 = pairs[1];
   if (pairs2[0] >= pairs1[0] && pairs2[1] <= pairs1[1]) {
      return 1; // pair 2 fully contained within pair 1
   }
   else if (pairs1[0] >= pairs2[0] && pairs1[1] <= pairs2[1]) {
      return 1; // pair 1 fully contained within pair 2
   }
   else {
      return 0; // neither pair contained within each other
   }
}

// takes two pairs and determines if either pair's range overlaps with the other
function doRangesOverlap(pairs) {
   const pairs1 = pairs[0];
   const pairs2 = pairs[1];
   if (inRange(pairs1[0], pairs2[0], pairs1[1])) {
      return 1; // pair 2 overlaps pair 1
   }
   else if (inRange(pairs1[0], pairs2[1], pairs1[1])) {
      return 1; // pair 2 overlaps pair 1
   }
   else if (inRange(pairs2[0], pairs1[0], pairs2[1])) {
      return 1; // pair 1 overlaps pair 2
   }
   else if (inRange(pairs2[0], pairs1[1], pairs2[1])) {
      return 1; // pair 1 overlaps pair 2
   }
   else {
      return 0; // neither pair overlaps
   }
}

// determines if a number is in the range of two other numbers
function inRange(low, x, high) {
   if (low <= x && x <= high) {
      return true;
   }
   else {
      return false;
   }
}

/* ------------------ FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const fullyContainCount = inputGroups.map(grp => doesRangeFullyContain(grp)); // determine how many pairs are fully contained within each other
   const totalPairCount = fullyContainCount.reduce((acc, curr) => acc + curr, 0);  // add up all the values in the array
   console.log(`Part One Solution: ${totalPairCount}`);
}

// Solve Part Two Function
function solvePartTwo() {
   const overlapCount = inputGroups.map(grp => doRangesOverlap(grp)); // determine how many pairs' ranges overlap
   const totalOverlapCount = overlapCount.reduce((acc, curr) => acc + curr, 0);  // add up all the values in the array
   console.log(`Part Two Solution: ${totalOverlapCount}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();