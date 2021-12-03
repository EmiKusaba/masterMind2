let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd'];

//Spec 0
const masterMind = () => {
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
    solutionArray[i] = null;
    }
  }
}
