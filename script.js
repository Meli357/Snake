let playBoard = document.querySelector(".play-board");

//create variables that will change its value
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;

//new array
let snakeBody = [];

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

    //to add elements to the snake
    snakeBody.push([foodX, foodY]);
    //console.log(snakeBody);
  }

  //add element to snakeBody
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  //coordinates for snakeBody
  snakeBody[0] = [snakeX, snakeY];

  //position of snake changes according to key pressed
  snakeX += velocityX;
  snakeY += velocityY;

  //to create element for snake after eating fruit
  for (let index = 0; index < snakeBody.length; index++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]} / ${snakeBody[index][0]}"></div>`;
  }
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
