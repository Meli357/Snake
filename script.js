let playBoard = document.querySelector(".play-board");

//create variables that will change its value
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;

//function to make food appear randomly
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

changeFoodPosition();

//function to display within the play board our snake and fruit
const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  //if condition is true change position of new fruit
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
  }

  //position of snake changes according to key pressed
  snakeX += velocityX;
  snakeY += velocityY;

  htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  playBoard.innerHTML = htmlMarkup;
};

//to change direction of snake based on coordinates
const changeDirection = (e) => {
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
  //initGame();
};

//initGame();

setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
