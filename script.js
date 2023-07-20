"use strict";
//selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0Num = document.getElementById("current--0");
const current1Num = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//starting conditions

let scores, currentNumber, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentNumber = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  current0Num.textContent = 0;
  score1El.textContent = 0;
  current1Num.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentNumber = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
  if (playing) {
    //1.Generate Random Number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    //2.Display Dice Roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNumber}.png`;

    //3.Condition Check
    if (diceNumber !== 1) {
      //IF diceNumber isn't One
      currentNumber += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentNumber;
      // current0Num.textContent = currentNumber;
    } else {
      //FOR SWITCHING PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentNumber;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
