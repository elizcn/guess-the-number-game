 /**
 * Guess The Number Game
 * DONE: Get user value from input and save it to variable numberGuess
 * DONE: Generate a random number 1 to 100 and save it to variable correctNumber
 * DONE: Console whether the guess is too high, too low, or is correct inside playGame function
 * DONE: Create a function called displayResult to move the logic for if the guess is too high, too low, or correct
 * DONE: Complete the showYouWon, showNumberAbove, showNumberBelow
 * DONE: Use the showYouWon... functions within displayResult to display the correct dialog
 * DONE: Save the guess history in a variable called guess
 * DONE: Display the guess history using displayHistory() function
 * DONE: Use the initGame() function to restart the game
 * EXTRA:
 * DONE: Validate the number field is not empty
 * DONE: Validate the number has not been guessed already
 * DONE: Restrict the number of attempts
 * DONE: Deactivate submission after the user won/lost
 * DONE: Add confetti effect if user wins
 * TO DO: Add header animation
 * DONE: Make it responsive
 */


// Variable to store the list of guesses 
let guesses = [];

// Variable for store the correct random number 
let correctNumber = getRandomNumber();

//Variable to set the number of intents
let numberIntents = 8;

//Instructions
let instructions = "Enter a number between 0 and 100";

window.onload = function() {
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame)

    getRandomNumber();
    document.getElementById("guess-counter").innerHTML = instructions;
}

/**
 * Functionality for validating the input
 */
function validateInput() {

  //Validate field is not empty
  let numberGuess = document.getElementById('number-guess').value;
  if (numberGuess == "" || numberGuess == NaN || numberGuess == undefined) {
    showNumberEmpty();
    return false;
  }

  //Validate input has not been guessed already
  else if (guesses.indexOf(numberGuess) != -1) {
    showNumberRepeated();
    return false;
  }
  else {
    return true;
  }

}

/**
 * Functionality for playing the whole game
 */
function playGame(){

  let numberGuess = document.getElementById('number-guess').value;
  if (validateInput() && guessesCounter() <= numberIntents) {
    displayResult(numberGuess);
    saveGuessHistory(numberGuess);
    displayHistory();
  }
}

/**
 * Counts the number of guesses and delimitates it to 8
 */

 function guessesCounter() {
    let counter = "Intent " + (guesses.length + 1) + " of " + numberIntents;
    document.getElementById("guess-counter").innerHTML = counter;

   return guesses.length;
 }

/**
 * Show the result for if the guess it too high, too low, or correct
 */
function displayResult(numberGuess) {

  if (numberGuess > correctNumber) {
    showNumberAbove();
  }
  if (numberGuess < correctNumber) {
    showNumberBelow();
  }
  if (numberGuess == correctNumber) {
    showYouWon();

    // Deactivate check button, so we no longer accept inputs
    document.getElementById("number-submit").disabled = true;
  }
  if ((guesses.length + 1) >= numberIntents && numberGuess != correctNumber) {
    showYouLost();
    // Deactivate check button, so we no longer accept inputs
   document.getElementById("number-submit").disabled = true;
  }
}


/**
 * Initialize a new game by resetting all values and content on the page
 */
function initGame(){

  // Reset the corectNumber
  correctNumber = getRandomNumber();

  //Reset the result display, number field guess and guess counter
  document.getElementById("result").innerHTML = "";
  document.getElementById("lost-game").innerHTML = "";
  document.getElementById("guess-counter").innerHTML = instructions;

  // Reset the guesses array
  guesses = [];

  // reset the guess history display
  displayHistory();

  // Stops confetti if activated
  confetti.stop();  

  // Re-activate check button
  document.getElementById("number-submit").disabled = false;

  //Reset header color
  document.getElementById("header").style.color = "#FFD23F";

}

/**
 * Reset the HTML content for guess history
 */
function resetResultContent(){
  document.getElementById("result").innerHTML = "";
}

/**
 * Return a random number between 1 and 100
 */
function getRandomNumber(){
  
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

/**
 * Save guess history 
 */
function saveGuessHistory(guess) {

  guesses.push(guess);
}

/**
 * Display guess history to user
 * HTML TO USE:
 * <ul class='list-group'>
 *  <li class='list-group-item'>You guessed {number}</li>
 * </ul>
 */
function displayHistory() {
  let index = guesses.length - 1; 
  let list = "<ul class='list-group'>";

  while (index >= 0) {
    list += "<li class='list-group-item'>" + "You guessed " + guesses[index] + "</li>";
    index -= 1;
  }
  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}



/**
 * Retrieve the dialog based on if the guess is wrong or correct 
 */
function getDialog(dialogType, text){
  let dialog;
  switch(dialogType){
    case "empty":
      dialog = "<div class='alert alert-danger' role='alert'>"
      break;
    case "repeated":
      dialog = "<div class='alert alert-danger' role='alert'>"
      break;
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
    case "lost":
      dialog = "<div class='alert alert-danger' role='alert'>"
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

/**
 * Retrieve the dialog using the getDialog() function
 * and save it to variable called dialog
 */

function showNumberEmpty(){
  const text = "Please enter a number"

  let dialog = getDialog("empty", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberRepeated(){
  const text = "You already used this number, please try using a different one"

  let dialog = getDialog("repeated", text);
  document.getElementById("result").innerHTML = dialog;
}

function showYouWon(){
  document.getElementById("header").style.color = "#28a745";

  const text = "Awesome job, you got it!"

  let dialog = getDialog("won", text);

  document.getElementById("result").innerHTML = dialog;

  // Starts confettti animation
  confetti.start();
}

function showYouLost(){
  const text = "Sorry, you lost :( \n You have reached the maximum number of intents. Please restart the game."

  let dialog = getDialog("lost", text);

  document.getElementById("lost-game").innerHTML = dialog;

}

function showNumberAbove(){
  const text = "Your guess is too high!"

  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow(){
  const text = "Your guess is too low!"

  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}
