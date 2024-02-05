// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let score = "";
   let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
   for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
			score += `Points for '${word[i]}': ${pointValue}\n`
         score += parseInt(pointValue);
         break;
		 }
 
	  }
	}
   return score;
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let userWord = input.question("Enter a word:");
   let score = oldScrabbleScorer(userWord);
   console.log(`The score for the word "${userWord}" is: ${score}`);
};

function simpleScorer(word) {
   word = word.toUpperCase();
let score = "";
for (let i = 0; i < word.length; i++) {
   score += 1;
}
return score;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
let score = "";
for (let i = 0; i < word.length; i++) {
   if ("AEIOU".includes(word[i])) {
      score += 3;
   } else {
      score += 1
   }
}
return score;
}

let scrabbleScorer;

const scoringAlgorithms = [];

function scorerPrompt() {}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
