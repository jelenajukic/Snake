function Snake() {
  this.bodyElements = [new Element("head", 5, 185, snakeImages[0]), new Element("bodySnake", 5, 125, snakeImages[1]), new Element("bodySnake", 5, 65, snakeImages[1]), new Element("bodySnake", 5, 5, snakeImages[1])];
  this.snakeDirection = "down";
}

Snake.prototype.drawSnake = function () {
  var i = 0;
  while (i < this.bodyElements.length) {
    this.bodyElements[i].drawElement();

    i++;
  }

  console.log("collision is not detected");

}


Snake.prototype.moveHead = function () {

  var oldSnake = _.cloneDeep(this);
  var newArr = _.cloneDeep(moveElement(this.bodyElements)[1]);


  console.log('Novi niz je : ', newArr);
  //console.log('snakeelement je:', snakeElement);
  var tempArr = _.cloneDeep(newArr.slice(0, 1));
  console.log('temp niz je : ', tempArr);

  switch (this.snakeDirection) {
    case "up":
      tempArr[0].positionY -= 60;
      break;
    case "down":
      tempArr[0].positionY += 60;
      break;
    case "right":
      tempArr[0].positionX += 60;
      break;
    case "left":
      tempArr[0].positionX -= 60;
      break;
  }

  oldSnake.bodyElements.unshift(tempArr[0]);
  console.log("oldsnake is : ", oldSnake);
  if (gameCanvas.detectCollision(oldSnake) == true) {
    console.log("collision with body is detected now:");

    var snakeImages2 = loadImages(snakeImages, function () {
      console.log("snakeImages are loaded");


    })
    oldSnake.bodyElements.shift();
    oldSnake.bodyElements[0].img = snakeImages2[2];

    finishGame();
    setTimeout(function () {
      oldSnake.bodyElements.forEach(element => element.drawElement())
    }, 300);

  } else {
    newArr.unshift(tempArr[0]);
    this.bodyElements = [...newArr];


    for (var i = 0; i < this.bodyElements.length; i++) {

      this.bodyElements[i].img = new Image();
      if (i == 0) {
        this.bodyElements[i].name = "head"
        this.bodyElements[i].img.src = "./images/head.png";
      } else {
        this.bodyElements[i].name = "bodySnake";
        this.bodyElements[i].img.src = "./images/snake-element.png";
      }


    }
    console.log("ovo su novi elementi: ", this.bodyElements)
    this.drawSnake();
  }
}



Snake.prototype.changeSnakeDirection = function (arrowPressed) {

  switch (arrowPressed) {
    case 39: //right arrow is pressed
      if (this.snakeDirection === "left") {
        return false;

      } else {
        this.snakeDirection = "right";
        return true;
      }
    case 37: //left arrow is pressed
      if (this.snakeDirection === "right") {
        return false;

      } else {
        this.snakeDirection = "left";
        return true;
      }
    case 38: // up arrow is pressed
      if (this.snakeDirection === "down") {
        return false;

      } else {
        this.snakeDirection = "up";
        return true;
      }
    case 40: // down arrow is pressed
      if (this.snakeDirection === "up") {
        return false;

      } else {
        this.snakeDirection = "down";
        return true;
      }
  }
}