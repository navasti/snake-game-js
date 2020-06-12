import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection
} from './snake.js';
import { outsideGrid } from './grid.js';
import { update as updateFood, draw as drawFood } from './food.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector('#game-board');

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press OK to restart.')) {
      window.location = '/';
    };
    return;
  };

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
};

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkFailure();
};

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

function checkFailure() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};