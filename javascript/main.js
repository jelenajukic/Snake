var gameCanvas;
var element;
var snake;
var interval;
var food;
//when page is loaded user has to see canvas with grid (game area)
var shouldStart = "yes";


var randomXYArray;
var randomFoodImgArr;
var snakeImages;


//Element constructor. It is the same for snake elements and food elements.

function Element(name, x, y, direction, imgSrc) {
  this.name = name;
  this.direction = direction;
  this.positionX = x;
  this.positionY = y;
  this.img = new Image();
  this.drawElement = function () {
    that = this;
    gameCanvas.context.drawImage(that.img, that.positionX, that.positionY, 50, 50);

  }
  //this.img.onload = this.drawElement();
  this.img.src = imgSrc;




}

function Snake() {
  this.bodyElements = [new Element("head", 5, 185, "down", snakeImages[0]), new Element("bodySnake", 5, 125, "down", snakeImages[1]), new Element("bodySnake", 5, 65, "down", snakeImages[1]), new Element("bodySnake", 5, 5, "down", snakeImages[1])];
  this.drawSnake = function () {
    var i = 0;
    while (i < this.bodyElements.length) {
      this.bodyElements[i].drawElement();

      i++;
    }
    if (gameCanvas.detectCollision(this.bodyElements[0])) {
      console.log("Collision is detected");
      clearInterval(interval);
      gameCanvas.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
      gameCanvas.drawMyCanvas();
      switch (this.bodyElements[0].direction) {
        case "up":
          this.bodyElements.forEach(element => {
            element.positionY += 60;
            element.drawElement();

          })
          break;
        case "down":
          this.bodyElements.forEach(element => {
            element.positionY -= 60;
            element.drawElement();

          })
          break;
        case "right":
          this.bodyElements.forEach(element => {
            element.positionX -= 60;
            element.drawElement();

          })
          break;
        case "left":
          this.bodyElements.forEach(element => {
            element.positionX += 60;
            element.drawElement();

          })

          break;
      }

      document.getElementById("input-div").style.display = "block";
      document.getElementById("page-mask").style.display = "block";
      removeEventListener("keydown", pressedKey);

      var el = document.getElementById("input-field");

      document.getElementById("submit-button").addEventListener("click", function () {
        localStorage.setItem(el.value, gameCanvas.score);
      })

    } else {
      console.log("collision is not detected");
    }
  }

  this.changeSnakeDirection = function (arrowPressed) {

    switch (arrowPressed) {
      case 39: //right arrow is pressed
        if (this.bodyElements[0].direction === "left") {
          return false;

        } else {
          this.bodyElements[0].direction = "right";
          return true;
        }
      case 37: //left arrow is pressed
        if (this.bodyElements[0].direction === "right") {
          return false;

        } else {
          this.bodyElements[0].direction = "left";
          return true;
        }
      case 38: // up arrow is pressed
        if (this.bodyElements[0].direction === "down") {
          return false;

        } else {
          this.bodyElements[0].direction = "up";
          return true;
        }
      case 40: // down arrow is pressed
        if (this.bodyElements[0].direction === "up") {
          return false;

        } else {
          this.bodyElements[0].direction = "down";
          return true;
        }
    }
  }

  this.moveHead = function (snakeElement) {
    var newArr = _.cloneDeep(moveElement(this.bodyElements));


    console.log('Novi niz je : ', newArr);
    console.log('snakeelement je:', snakeElement);
    var tempArr = _.cloneDeep(newArr.slice(0, 1));
    console.log('temp niz je : ', tempArr);

    switch (snakeElement.direction) {
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

    newArr.unshift(tempArr[0]);
    this.bodyElements = [...newArr];


    for (var i = 0; i < this.bodyElements.length; i++) {

      this.bodyElements[i].img = new Image();
      if (i == 0) {
        this.bodyElements[i].name = "head"
        this.bodyElements[i].img.src = "./images/head.jpeg";
      } else {
        this.bodyElements[i].name = "bodySnake";
        this.bodyElements[i].img.src = "./images/snake-element.png";
      }


    }
    console.log("ovo su novi elementi: ", this.bodyElements)
    this.drawSnake();
  }


}


function moveElement(arr) {
  arr.pop(); //arr contains now first three elements of snake.bodyElements array.
  return arr;

}




//Constructor for canvas. Based on it I create canvas with grid. It has draw method which will create canvas with 100 cells. One cell is width =60px and height:60px;

function MyCanvas() {
  this.width = 600;
  this.height = 600;
  this.canvas = document.getElementById("myCanvas");
  this.context = this.canvas.getContext("2d");
  this.score = 0;
  this.drawMyCanvas = function () {
    for (var x = 0; x < 600; x += 60) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, 600);
      this.context.fill();
    //   this.context.fillStyle = "red";
    // this.context.fill();
    }

    for (var y = 0; y < 600; y += 60) {
      this.context.moveTo(0, y);
      this.context.lineTo(600, y);
    //   this.context.fillStyle = "red";
    // this.context.fill();
    }

    this.context.moveTo(600, 0);
    this.context.lineTo(600, 600);
    this.context.moveTo(0, 600);
    this.context.lineTo(600, 600);
    this.context.strokeStyle = 'white';
    this.context.stroke();
    // this.context.fillStyle = "red";
    // this.context.fill();
  }
  this.updateCanvas = function () {



    interval = setInterval(function () {

      gameCanvas.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

      gameCanvas.drawMyCanvas();

      snake.moveHead(snake.bodyElements[0]);
      gameCanvas.foodIsEaten(snake);
      food.drawElement();

    }, 250);


  }

  this.detectCollision = function (snakeElement) {

    if (snakeElement.positionX >= 605 && snakeElement.direction == "right") {
      return true;
    } else if (snakeElement.positionX < 5 && snakeElement.direction == "left") {
      return true
    } else if (snakeElement.positionY < 5 && snakeElement.direction == "up") {
      return true;
    } else if (snakeElement.positionY >= 605 && snakeElement.direction == "down") {
      return true;
    } else {
      return false;
    }

  }

  this.foodIsEaten = function (ourSnake) {

    var workingSnake = _.cloneDeep(ourSnake);

    if (workingSnake.bodyElements[0].positionX == food.positionX && workingSnake.bodyElements[0].positionY == food.positionY) {
      console.log("yes");

      this.score++;
      food = randomFood(snake);
      console.log("score is: ", this.score);
      console.log("new food is: ", food);


    } else {
      console.log("still not");
    }

  }

}


function randomFood(ourSnake) {

  var workingSnake = _.cloneDeep(ourSnake);
  var ourSnakePositionsArr = [];
  var foodElement;

  var randomXYArr = generateTwoRandom(randomXYArray); //it should be 2d array

  for (var i = 0; i < ourSnake.bodyElements.length; i++) {

    var ourSnakePositionX = ourSnake.bodyElements[i].positionX;
    var ourSnakePositionY = ourSnake.bodyElements[i].positionY;

    ourSnakePositionsArr.push([ourSnakePositionX, ourSnakePositionY]);

  }

  for (var j = 0; j < ourSnakePositionsArr.length; i++) {
    if (_.isEqual(ourSnakePositionsArr[j], randomXYArr)) {
      randomFood(workingSnake);
    } else {
      foodElement = new Element("apple", randomXYArr[0], randomXYArr[1], "", _.sample(randomFoodImgArr));
      return foodElement;
    }
  }
  //return foodElement;
}


function generateTwoRandom(arr) {
  var randomX = _.sample(arr);
  var randomY = _.sample(arr);
  var twoPositions = [randomX, randomY];
  return twoPositions;
}



function startMovingSnake(command) {
  if (shouldStart == "yes") {

    gameCanvas.updateCanvas();
  } else {

  }

}

function pressedKey(event) {

  console.log("key pressed");
  snake.changeSnakeDirection(event.keyCode);
  startMovingSnake(shouldStart);
  shouldStart = "no";
}

function makeResultList() {

  var resultArr = [];

  Object.entries(localStorage).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    resultArr.push({
      name: key,
      score: value
    });
  });

  return resultArr;
}


function sortResult() {
  var listArr = makeResultList();
  listArr.sort((a, b) => b.score - a.score);
  console.log(listArr);
  return listArr;
}

function presentResult() {
  var theListOfBest = sortResult().slice(0, 5);
  var i = 0;
  while (i < theListOfBest.length) {
    var newDivFlex = document.createElement("div");
    newDivFlex.style.display = "flex";
    newDivFlex.style.justifyContent="space-around"
    newDivFlex.style.height="10%";
    var newDivName = document.createElement("div");
    var newDivScore = document.createElement("div");
    var newDivNameText = document.createTextNode(theListOfBest[i].name);
    var newDivScoreText = document.createTextNode(theListOfBest[i].score);
    newDivName.style.height="50%";
    newDivName.style.width="50%";
    newDivScore.style.height="50%";
    newDivScore.style.width="50%"
    newDivName.style.padding="20px";
    newDivScore.style.padding="20px";
    newDivName.style.fontSize="20px";
    newDivScore.style.fontSize="20px";
    newDivFlex.style.backgroundImage="url('./images/bg-name-rules-components.png')";
    // newDivScore.style.backgroundImage="url('./images/bg-name-rules-components.png')";
    document.getElementById("result").appendChild(newDivFlex);
    newDivFlex.appendChild(newDivName);
    newDivFlex.appendChild(newDivScore);
    newDivName.appendChild(newDivNameText);
    newDivScore.appendChild(newDivScoreText);


    i++;
  }



}

window.onload = function () {


  randomXYArray = [5, 65, 125, 185, 245, 305, 365, 425, 485, 545];


  console.log("food: ", randomFoodImgArr);
  console.log("snake images: ", snakeImages);




  gameCanvas = new MyCanvas(); //create canvas object. canvas is global variable.
  gameCanvas.drawMyCanvas(); //then call drawMyCanvas method on canvasObject
  randomFoodImgArr = ["./images/apple.png", "./images/banana.png", "./images/broccoli.png", "./images/carrot.png",
    "./images/cheese.png", "./images/grapes.png", "./images/pear.png", "./images/strawberry.png"
  ];

  snakeImages = ["./images/head.jpeg", "./images/snake-element.png"]

  snake = new Snake();
  console.log("MySnek is :", snake);
  food = randomFood(snake);

  var imgH = new Image();
  imgH.onload = function () {
    gameCanvas.context.drawImage(imgH, snake.bodyElements[0].positionX, snake.bodyElements[0].positionY, 50, 50);

  }
  imgH.src = "./images/head.jpeg";

  var imgB1 = new Image();
  imgB1.onload = function () {
    gameCanvas.context.drawImage(imgB1, snake.bodyElements[1].positionX, snake.bodyElements[1].positionY, 50, 50);

  }
  imgB1.src = "./images/snake-element.png";

  var imgB2 = new Image();
  imgB2.onload = function () {
    gameCanvas.context.drawImage(imgB2, snake.bodyElements[2].positionX, snake.bodyElements[2].positionY, 50, 50);

  }
  imgB2.src = "./images/snake-element.png";

  var imgB3 = new Image();
  imgB3.onload = function () {
    gameCanvas.context.drawImage(imgB3, snake.bodyElements[3].positionX, snake.bodyElements[3].positionY, 50, 50);

  }
  imgB3.src = "./images/snake-element.png";

  console.log("Myfood is :", food);
  //food.drawElement();


  presentResult();



  addEventListener("keydown", pressedKey);


}