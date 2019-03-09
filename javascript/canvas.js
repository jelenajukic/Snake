function MyCanvas() {
  this.width = 600;
  this.height = 600;
  this.canvas = document.getElementById("myCanvas");
  this.context = this.canvas.getContext("2d");
  this.score = 0;
}


MyCanvas.prototype.drawMyCanvas = function () {
  for (var x = 0; x < this.width; x += 60) {
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.width);

  }

  for (var y = 0; y < this.height; y += 60) {
    this.context.moveTo(0, y);
    this.context.lineTo(this.height, y);

  }

  this.context.moveTo(this.width, 0);
  this.context.lineTo(this.width, this.height);
  this.context.moveTo(0, this.height);
  this.context.lineTo(this.width, this.height);
  this.context.strokeStyle = 'white';
  this.context.stroke();

}


MyCanvas.prototype.updateCanvas = function () {

  // gameCanvas.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  // gameCanvas.drawMyCanvas();
  // snake.moveHead();
  // gameCanvas.foodIsEaten(snake);
  // food.drawElement();


  interval = setInterval(function () {
    gameCanvas.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCanvas.drawMyCanvas();
    snake.moveHead();
    gameCanvas.foodIsEaten(snake);
    food.drawElement();

  }, 250);

}


MyCanvas.prototype.detectCollision = function (ourSnake) {

  if (ourSnake.bodyElements[0].positionX >= 605 && ourSnake.snakeDirection == "right") {
    return true;
  } else if (ourSnake.bodyElements[0].positionX < 5 && ourSnake.snakeDirection == "left") {
    return true
  } else if (ourSnake.bodyElements[0].positionY < 5 && ourSnake.snakeDirection == "up") {
    return true;
  } else if (ourSnake.bodyElements[0].positionY >= 605 && ourSnake.snakeDirection == "down") {
    return true;
  } else if (this.detectCollisionWithBody(ourSnake)) {
    return true;
  } else {
    return false;
  }

}



MyCanvas.prototype.detectCollisionWithBody = function (ourSnake) {


  if (ourSnake.bodyElements.length >= 5) {
    var collisionArr = _.cloneDeep(ourSnake.bodyElements);

    var snakeHead = collisionArr.shift();

    var collisionElement = collisionArr.find(element => element.positionX == snakeHead.positionX && element.positionY == snakeHead.positionY);

    console.log(collisionElement);

    if (collisionElement == undefined) {
      return false;
    } else {
      console.log("collision with body")
      //ourSnake.collisionWithBody=true;
      return true;
    }
  } else {
    return false;
  }


}



MyCanvas.prototype.foodIsEaten = function (ourSnake) {

  // var workingSnake = _.cloneDeep(ourSnake);

  if (ourSnake.bodyElements[0].positionX == food.positionX && ourSnake.bodyElements[0].positionY == food.positionY) {
    console.log("yes");
    this.addSnakeElement();
    
    this.score++;
    food = randomFood(snake);
    document.getElementById("score").innerHTML = this.score;
    console.log("score is: ", this.score);
    console.log("new food is: ", food);


  } else {
    console.log("still not");
  }

}


MyCanvas.prototype.addSnakeElement = function () {
  var oudPositionX = snake.bodyElements[snake.bodyElements.length - 1].positionX;
  var oudPositionY = snake.bodyElements[snake.bodyElements.length - 1].positionY;
  snake.bodyElements.push(new Element("bodySnake", oudPositionX, oudPositionY, snakeImages[1]))

}