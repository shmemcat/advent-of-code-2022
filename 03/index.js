/* ------------------ IMPORTS ------------------ */
import { readFileSync } from 'node:fs';

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", {encoding: "UTF-8"} );

function halve(str) {
   let temp = [];
   temp.push(str.slice(0, str.length / 2));
   temp.push(str.slice(str.length / 2, str.length));
   return temp;
}

function priorities(str) {
   // object mapping
   return {
      "a": 1,
      "b": 2,
      "c": 3,
      "d": 4,
      "e": 5,
      "f": 6,
      "g": 7,
      "h": 8,
      "i": 9,
      "j": 10,
      "k": 11,
      "l": 12,
      "m": 13,
      "n": 14,
      "o": 15,
      "p": 16,
      "q": 17,
      "r": 18,
      "s": 19,
      "t": 20,
      "u": 21,
      "v": 22,
      "w": 23,
      "x": 24,
      "y": 25,
      "z": 26,
      "A": 27,
      "B": 28,
      "C": 29,
      "D": 30,
      "E": 31,
      "F": 32,
      "G": 33,
      "H": 34,
      "I": 35,
      "J": 36,
      "K": 37,
      "L": 38,
      "M": 39,
      "N": 40,
      "O": 41,
      "P": 42,
      "Q": 43,
      "R": 44,
      "S": 45,
      "T": 46,
      "U": 47,
      "V": 48,
      "W": 49,
      "X": 50,
      "Y": 51,
      "Z": 52
   }[str]
}

// convert each array into sets to find the intersection using filtering
function findIntersection(x) {
   var set1 = new Set(x[0]);
   var set2 = new Set(x[1]);
   var intersect = new Set([...set1].filter(i => set2.has(i)));
   return [...intersect];
}

function findIntersectionElfGroup(x) {
   var set1 = new Set(x[0]);
   var set2 = new Set(x[1]);
   var set3 = new Set(x[2]);
   var intersect = [set1, set2, set3].reduce((a, b) => new Set([...a].filter(x => b.has(x))));
   return [...intersect];
}

/* ------------------ FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   const inputGroups1 = input.split("\n").map(str => halve(str));  // Split and group input
   const filteredArray = inputGroups1.map(str => findIntersection(str));  // convert each array into sets to find the intersection using filtering
   const totalPointsArray = filteredArray.map(str => priorities(str));  // use object mapping to assign a number value to each letter
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

   const filteredElfGroupsArray = elfGroups.map(strGrp => findIntersectionElfGroup(strGrp));  // convert each array into sets to find the intersection using filtering
   const totalPointsElvesArray = filteredElfGroupsArray.map(str => priorities(str));  // use object mapping to assign a number value to each letter
   const totalPointsElves = totalPointsElvesArray.reduce((acc, curr) => acc + curr, 0);  // add up all the values in the array

   console.log(`Part Two Solution: ${totalPointsElves}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();