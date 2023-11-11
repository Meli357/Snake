let playBoard = document.querySelector(".play-board");

//create variables that will change its value
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;

//function to make food appear randomly
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

changeFoodPosition();

//function to display within the play board our snake and fruit
const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  playBoard.innerHTML = htmlMarkup;
};

initGame();
