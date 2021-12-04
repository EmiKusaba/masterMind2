'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd'];


function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Spec 0
const mastermind = (guess) => {
    if (solution === guess) {
      return "You guessed it!";
    }
    let hint = generateHint(guess);
    board.push(guess + " " + hint);
  //Spec 4 - End the game 
    if (board.length >= 10) {
      return "You ran out of turns!";
    }
  
    return "Guess again!";
  }

//Spec 2.2 - Determine correct "letter-locations
const generateHint = (guess) =>{
  let guessArray = guess.split("");
  let solutionArray = solution.split("");

  let correctLetterLocations = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }
  //Spec 2.3 - Determine correct "letters"

  let correctLetters = 0;
  for(let i = 0; i <solutionArray.length; i++) {
    var guessValue = guessArray[i];
    var targetIndex = solutionArray.indexOf(guessValue);
    if(targetIndex > -1) {
    correctLetters++;
    solutionArray[targetIndex] = null
    }
  }

  return `${correctLetters}-${correctLetterLocations}`
}



function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}