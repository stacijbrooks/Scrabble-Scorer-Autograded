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
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let userWord = input.question("Enter a word:");
   //let score = oldScrabbleScorer(userWord);
   //console.log(`The score for the word "${userWord}" is: ${score}`);
   return userWord
};

function simpleScorer(word) {
   word = word.toLowerCase();
let score = 0;
for (let i = 0; i < word.length; i++) {
   score += 1;
}
return score
};

function vowelBonusScorer(word) {
   word = word.toLowerCase();
let score = 0;
for (let i = 0; i < word.length; i++) {
   if (['a', 'e', 'i', 'o', 'u'].includes(word[i])) {
      score += 3;
   } else {
      score += 1
   }
}
return score
};


function scrabbleScorer(word) {
   word = word.toLowerCase();
let score = 0;
for (let i = 0; i < word.length; i++) {
   score += newPointStructure[word[i]] || 0;
}
return score
};


const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are worth 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   //console.log("Let's play some Scrabble!\n");

   //let userWord = input.question("Enter a word to score: ");
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let algNum = Number(input.question("Enter 0, 1, or 2: "));
   return scoringAlgorithms[algNum];

   //Score for 'coconut': 
}

function transform(oldPointStructure) {
   let transformedObject = {};
   for (let key in oldPointStructure) {
      let letters = oldPointStructure[key];
      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
        transformedObject[letter] = Number(key);
      }
   }
   return transformedObject;
}

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   let userWord = initialPrompt();
    let userSelection = scorerPrompt().scorerFunction;
    let score = userSelection(userWord);
    console.log(`Score for '${userWord}': ${score}`);
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
