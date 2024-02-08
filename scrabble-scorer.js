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
	let score = 0;
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
   return score
 };

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
let score = 0;
for (let i = 0; i < word.length; i++) {
   score += 1;
}
return score
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
let score = 0;
for (let i = 0; i < word.length; i++) {
   if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
      score += 3;
   } else {
      score += 1
   }
}
return score
};

console.log(vowelBonusScorer("Act"));

let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);


function scrabbleScorer(word) {
   word = word.toLowerCase();
let score = 0;
for (let i = 0; i < word.length; i++) {
   score += Number(newPointStructure[word[i]]);
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
   console.log("Let's play some Scrabble!\n");

   let userWord = input.question("Enter a word to score: ");
   console.log("Which scoring algorithm would you like to use?\n");

   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let algNum = input.question("Enter 0, 1, or 2: ");
   return {
      userWord: userWord,
      algNum: algNum
   }
   //Score for 'coconut': 
}

function transform(oldPointStructure) {
   let transformedObject = {};
   for (let key in oldPointStructure) {
      let letters = oldPointStructure[key];
      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         //console.log(`${key}, ${letter}`);
        transformedObject[letter] = key;
       // console.log(transformedObject);
      }
   }
   let unorderedObject = transformedObject;
   let unorderedLetters = [];
   for (let key in unorderedObject) {
      unorderedLetters.push(key);
   }
   let orderedLetters = unorderedLetters.sort();
   let orderedObject = {};
   for (let i = 0; i < orderedLetters.length; i++) {
      orderedObject[orderedLetters[i]] = Number(unorderedObject[orderedLetters[i]]);
   }
   return orderedObject;
   //console.log(transformedObject);
}

//console.log(transform(oldPointStructure));




function runProgram() {
   initialPrompt();
   let userSelection = scorerPrompt();
   let selectedWord = userSelection.userWord;
   let selectedIndex = userSelection.algNum;
   let selectedAlgObject = scoringAlgorithms[selectedIndex];
   let selectedFunction = selectedAlgObject.scorerFunction;
   console.log(`Score for '${selectedWord}': ${selectedFunction(selectedWord)}`);
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
