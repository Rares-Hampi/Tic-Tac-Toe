let intro = document.querySelector(".intro");
let play = document.querySelector(".play");
let allbox = document.querySelectorAll(".board div");
let turns = document.querySelector(".turns");
let turn1 = document.querySelector(".Yturn");
let turn2 = document.querySelector(".Cturn");
let board = document.querySelector(".board");
let result = document.querySelector(".result");
let Wontext = document.querySelector(".Wontext");
let restart = document.querySelector(".result button");
let playerSign = "X";
let runBot = true;
let pIcon = "fas fa-times";
let cIcon = "far fa-circle";

//todo add atribute 'onclick' for all cell in the board
window.onload = () => {
  for (let i = 0; i < allbox.length; i++) {
    allbox[i].setAttribute("onclick", "clickedBox(this)");
  }
};

//todo create click function for adding the player sign, adding the active class for turns and create a ID for the element chosen
function clickedBox(element) {
  element.innerHTML = `<i class="${pIcon}"></i>`;
  turn1.classList.remove("active");
  turn2.classList.add("active");
  element.setAttribute("id", playerSign);

  //todo add pointerEvents to box who was clicked for can't click it again
  element.style.pointerEvents = "none";

  //todo add pointerEvents to board for the bot make his turn
  board.style.pointerEvents = "none";

  //todo generate a random number for adding delay to the bot function
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomTimeDelay);

  //todo call the function for looking who win
  selectWinner();
}

//todo create bot function
function bot() {
  let array = []; // here we'll add the uncliked box

  if (runBot) {
    playerSign = "O";

    //todo add the uncliked box to array
    for (let i = 0; i < allbox.length; i++) {
      if (allbox[i].childElementCount == 0) {
        //if the box has no children means <i> tag
        array.push(i);
      }
    }

    //todo getting random box from array
    let randomBox = array[Math.floor(Math.random() * array.length)];

    if (array.length > 0) {
      //todo add circle icon tag inside bot selected element
      allbox[randomBox].innerHTML = `<i class="${cIcon}"></i>`;

      //todo remove active class in players
      turn2.classList.remove("active");
      turn1.classList.add("active");

      //todo set id attribute in box with player choosen sign
      allbox[randomBox].setAttribute("id", playerSign);

      //todo add pointerEvents to box who was clicked for can't click it again
      allbox[randomBox].style.pointerEvents = "none";

      //todo call the function for looking who win
      selectWinner();
    }

    //todo add pointerEvents to board for the player make his turn
    board.style.pointerEvents = "auto";

    //if player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
    playerSign = "X";
  }
}

function getIdVal(classname) {
  return document.querySelector(".cell" + classname).id; //return id value
}

function checkIdSign(val1, val2, val3, sign) {
  //checking all id value is equal to sign (X or O) or not if yes then return true
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}

//todo create winner function
function selectWinner() {
  //todo if the one of following winning combination match then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    //todo cancel the bot function
    runBot = false;

    //todo calling bot function
    bot(runBot);
    setTimeout(() => {
      result.style.animation = "opacity 1s both";
    }, 700);
    Wontext.textContent = `Player ${playerSign} won the game!`; //displaying winning text with passing playerSign (X or O)
  } else {
    //todo if all boxes have id value and still no one win then draw the match
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      //todo cancel the bot function
      runBot = false;

      //todo calling bot function
      bot(runBot);
      setTimeout(() => {
        result.style.animation = "opacity 1s both";
      }, 700);
      Wontext.textContent = "Match has been drawn!";
    }
  }
}

restart.addEventListener("click", () => {
  window.location.reload();
});
