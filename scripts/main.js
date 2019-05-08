let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let size = 10;
let width = canvas.width;
let height = canvas.height;
// no of horizontal boxes = width / size
// no of vertical boxes =height / size

let snake = [];

let food;
let dx = size;
let dy = 0;

addBlockToSnake(0,0);
addBlockToSnake(10,0);
addBlockToSnake(20,0);
addFood();

setInterval(update, 100);

window.addEventListener("keydown", keys);

function addBlockToSnake(xVal, yVal) {
  snake.push({
    x: xVal,
    y: yVal
  });
  drawRect(xVal, yVal);
}

function update() {
  ctx.clearRect(0,0,width, height);
  snake.shift();
  if(selfCollide()) {
    alert("YOU LOST");
  }
  if (foodCollide()) {
    addFood();
    updateSnakeBlocks();
  }

  updateSnakeBlocks();
  drawSnake();
  drawRect(food.x, food.y);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    drawRect(snake[i].x,snake[i].y);
  }
}

function keys(e) {
  if (e.keyCode == 40) { //Down
    console.log("DOWN");
    dx = 0;
    dy = size;
  } else if (e.keyCode == 39) { //Right
    console.log("RIGHT");
    dx = size;
    dy = 0;
  } else if (e.keyCode == 38) { //Up
    console.log("UP");
    dx = 0;
    dy = -size;
  } else if (e.keyCode == 37) { //Left
    console.log("LEFT");
    dx = -size;
    dy = 0;
  }
}

function foodCollide() {
  let headX = snake[snake.length - 1].x;
  let headY = snake[snake.length - 1].y;
  return headX == food.x && headY == food.y;
}

function updateSnakeBlocks() {

  let x = (snake[snake.length -1].x + dx);
  let y = (snake[snake.length -1].y + dy);
  if (dx == size &&
      snake[snake.length - 1].x == width) {

        x = 0;
  } else if (dx == -size &&
      snake[snake.length -1].x == 0) {

      x = width;
  }else if (dy == -size &&
      snake[snake.length - 1].y == 0) {

        y = height;
  }else if (dy == size &&
      snake[snake.length -1].y == height) {

        y = 0;
  }
  addBlockToSnake(x, y);


}

function addFood() {
  let xVal = Math.floor(Math.random() * width / size) * size;
  let yVal = Math.floor(Math.random() * height / size) * size;

  food = {
    x: xVal,
    y: yVal
  }
}

function selfCollide() {
  let headX = snake[snake.length - 1].x;
  let headY = snake[snake.length - 1].y;
  for(let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x == headX && snake[i].y == headY) {
      return true;
    }
  }
  return false;
}

function drawRect(x, y) {
  ctx.fillRect(x, y, size, size);
}
