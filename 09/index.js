/* ------------------ IMPORTS ------------------ */
import { readFileSync } from "node:fs";

/* ------------------ READ INPUT ------------------ */
const input = readFileSync("./input.txt", { encoding: "UTF-8" });

/* ------------------ OBJECTS ------------------ */
const direction = {
   U: [0, -1],
   D: [0, 1],
   R: [1, 0],
   L: [-1, 0]
};

/* ------------------ DATA FUNCTIONS ------------------ */

function simulate(knots) {
   const commands = input.split("\n").map(dir => dir.split(" ")).map(step => [step[0], parseInt(step[1])]);

   // rope[0] being the head and rope[i] being the tail
   let rope = Array.from({ length: knots }, () => [0, 0]);
   let visited = [];
   commands.map(cmd => {
      for (let i = 0; i < cmd[1]; i++) {
         // advance the head, add the coordinate transform numbers to the rope head coordinates based on the direction recieved
         rope[0] = [rope[0][0] + direction[cmd[0]][0], rope[0][1] + direction[cmd[0]][1]];

         // advance the tail (ith point) of the rope based on the segments in between ((i-1)th point)
         for (let j = 1; j < knots; j++) {
            // if the distance from the rope head and the previous knot is greater than 1 in either the x or y direction
            if (Math.abs(rope[j - 1][0] - rope[j][0]) > 1 || Math.abs(rope[j - 1][1] - rope[j][1]) > 1) {
               // update the positions accordingly - use absolute value to determine if the direction to be moved is positive or negative for each coordinate
               let xDelta = rope[j - 1][0] == rope[j][0] ? 0 : (rope[j - 1][0] - rope[j][0]) / Math.abs(rope[j - 1][0] - rope[j][0]);
               let yDelta = rope[j - 1][1] == rope[j][1] ? 0 : (rope[j - 1][1] - rope[j][1]) / Math.abs(rope[j - 1][1] - rope[j][1]);

               // update the position of the point
               rope[j][0] += xDelta;
               rope[j][1] += yDelta;
            }
         }
         let coords = rope[knots - 1];
         let pushFlag = true;
         for (const pair of visited) {
            if (pair[0] === coords[0] && pair[1] === coords[1]) {
               pushFlag = false;
            }
         }
         if (pushFlag) {
            visited.push([coords[0], coords[1]]);
         }
      }
   });
   return visited;
}

/* ------------------ SOLUTION FUNCTIONS ------------------ */

// Solve Part One Function
function solvePartOne() {
   // run the simulate function with 2 segments
   const visitedCoords2 = simulate(2);
   const uniqueVisitedCount2 = visitedCoords2.length;
   console.log(`Part One Solution: ${uniqueVisitedCount2}`);
}

// Solve Part Two Function
function solvePartTwo() {
   // run the simulate function with 10 segments
   const visitedCoords10 = simulate(10);
   const uniqueVisitedCount10 = visitedCoords10.length;
   console.log(`Part Two Solution: ${uniqueVisitedCount10}`);
}

/* ------------------ FUNCTION CALLS ------------------ */
solvePartOne();
solvePartTwo();