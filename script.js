let playBoard = document.querySelector(".play-board");

const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

//create variables that will change its value

let gameOver = false;

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;

let setIntervalId;

let score = 0;

//to store max score
let highScore = localStorage.getItem("high-score") || 0;
//to show highsScore
highScoreElement.innerHTML = `High score : ${highScore}`;

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
  //checks if gameover is true
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  //if condition is true change position of new fruit
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();

    //to add elements to the snake
    snakeBody.push([foodX, foodY]);

    score++;

    //ternary condition to show high score
    highScore = score >= highScore ? score : highScore;
    //store value so that it will update score
    localStorage.setItem("high-score", highScore);

    //show both scores
    scoreElement.innerHTML = `🍐 : ${score}`;
    highScoreElement.innerHTML = `High score : ${highScore}`;
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

  //condition that checks if snake is out of box
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  //to create element for snake after eating fruit
  for (let index = 0; index < snakeBody.length; index++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]} / ${snakeBody[index][0]}"></div>`;
    //checks if snake hits body
    if (
      index !== 0 &&
      snakeBody[0][1] === snakeBody[index][1] &&
      snakeBody[0][0] === snakeBody[index][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

//shows alert and refreshes page if snake touches border
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! 😭 Press OK to restart");
  location.reload();
};

//to change direction of snake based on coordinates
//add second condition with velocity
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  //initGame();
};

//initGame();

setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
