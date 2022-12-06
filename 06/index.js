/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = String(readFileSync("./input.txt", { encoding: "UTF-8" }));

/* ------------------ DATA FUNCTIONS ------------------ */

// Check for repeats in a 4 character string
function checkFourCharSeqs(str) {
   let index = 3; // keep track of where the marker occurs after processing
   // iterate over the characters of the string
   for (let i = 0; i < str.length - 3; i++) {
      // extract a four-character sequence from the string
      let marker = str.substring(i, i + 4);
      index++; // add one to the marker counter

      // check if any of the characters in the sequence are repeated
      if (!hasRepeats(marker)) { // if no repeats
         return index;
      }
   }
   return 0;
}

// Check for repeats in a 14 character string
function checkFourteenCharSeqs(str) {
   let index = 13; // keep track of where the marker occurs after processing
   // iterate over the characters of the string
   for (let i = 0; i < str.length - 13; i++) {
      // extract a fourteen-character sequence from the string
      let marker = str.substring(i, i + 14);
      index++; // add one to the marker counter

      // check if any of the characters in the sequence are repeated
      if (!hasRepeats(marker)) { // if no repeats
         return index;
      }
   }
   return 0;
}

/*
Using a regular expression to catch repeats
   /: the forward slash at the beginning and end of the pattern delimits the regular expression.
   (.): the first capturing group matches any single character and captures it to be used later in the pattern.
   .*: the .* pattern matches any number of characters (zero or more) except a newline character. This is used to match the characters between the two instances of the repeated character.
   \1: the \1 backreference matches the first captured character (the repeated character) that was matched by the first capturing group.
   /: the closing forward slash at the end of the pattern delimits the regular expression.
*/
function hasRepeats(str) {
   return /(.).*\1/.test(str);
}

/* ------------------ SOLUTION FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const markerIndex = checkFourCharSeqs(input);
   console.log(`Part One Solution: ${markerIndex}`);
}

// Solve Part Two Function
function solvePartTwo() {
   const markerIndexFourteen = checkFourteenCharSeqs(input);
   console.log(`Part Two Solution: ${markerIndexFourteen}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();
