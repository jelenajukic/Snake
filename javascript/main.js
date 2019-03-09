var gameCanvas;
var element;
var snake;
var interval;
var food;
//when page is loaded user has to see canvas with grid (game area)
var shouldStart = true;
var paused = false;
var randomXYArray = [5, 65, 125, 185, 245, 305, 365, 425, 485, 545];
var randomFoodImgArr;
var snakeImages;
var loadcount = 0;
var loadtotal = 0;
var preloaded = false;
var myMusic;
var player;
// var sound;

//Loader - global function

function loadImages(imagefiles, cb) {
  // Initialize variables
  loadcount = 0;
  loadtotal = imagefiles.length;
  preloaded = false;

  // Load the images
  var loadedimages = [];
  for (var i = 0; i < imagefiles.length; i++) {
    // Create the image object
    var image = new Image();

    // Add onload event handler
    image.onload = function () {
      loadcount++;
      if (loadcount == loadtotal) {
        // Done loading
        preloaded = true;
        cb();
      }
    };

    // Set the source url of the image
    image.src = imagefiles[i];

    // Save to the image array
    loadedimages[i] = image;
  }

  // Return an array of images
  return loadedimages;
}



function moveElement(arr) {
  var lastElement = arr.pop(); //arr contains now first three elements of snake.bodyElements array.
  return [lastElement, arr];

}

function finishGame() {


  clearInterval(interval);
  gameCanvas.context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  gameCanvas.drawMyCanvas();
  document.getElementById("input-div").style.display = "block";
  document.getElementById("page-mask").style.display = "block";
  var el = document.getElementById("input-field");
  document.getElementById("submit-button").addEventListener("click", function () {
    localStorage.setItem(el.value, gameCanvas.score);


  });
  removeEventListener("keydown", pressedKey);
}





function randomFood(ourSnake) {
  var snakePositions = [];
  var foodElement;
  ourSnake.bodyElements.forEach(element => snakePositions.push(element.positionX));

  var myArray = randomXYArray.filter((element) => !snakePositions.includes(element));

  randomX = generateRandom(myArray);

  randomY = generateRandom(randomXYArray);

  foodElement = new Element("", randomX, randomY, _.sample(randomFoodImgArr));
  return foodElement;

}

function generateRandom(arr) {
  var randomNum = _.sample(arr);
  return randomNum;
}



function startMovingSnake(command) {
  if (shouldStart == true) {

    gameCanvas.updateCanvas();
  } else {

  }

}

function pressedKey(event) {
  console.log("key pressed");

  if (event.keyCode == 32) {
    pauseGame();
  } else {


    if (snake.changeSnakeDirection(event.keyCode)) {
      startMovingSnake(shouldStart);

      shouldStart = false;

    };

  }


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
    newDivFlex.classList.add("result-name-score");
    var newDivName = document.createElement("div");
    var newDivScore = document.createElement("div");
    var newDivNameText = document.createTextNode(theListOfBest[i].name);
    var newDivScoreText = document.createTextNode(theListOfBest[i].score);
    newDivName.classList.add("result-name");
    newDivScore.classList.add("result-score");
    document.getElementById("result").appendChild(newDivFlex);
    newDivFlex.appendChild(newDivName);
    newDivFlex.appendChild(newDivScore);
    newDivName.appendChild(newDivNameText);
    newDivScore.appendChild(newDivScoreText);
    i++;
  }


}


function pauseGame() {
  if (paused == false) {
    clearInterval(interval);
    paused = true;

  } else {
    gameCanvas.updateCanvas();
    paused = false;
  }


}

player = new Audio();
document.body.prepend(player);


window.onload = function () {
  

  snakeImages = ["./images/head.png", "./images/snake-element.png", "./images/head-sad.png"];
  randomFoodImgArr = ["./images/apple.png", "./images/banana.png", "./images/broccoli.png", "./images/carrot.png",
    "./images/cheese.png", "./images/grapes.png", "./images/pear.png", "./images/strawberry.png"
  ];

  var randomFoodimagesArray = loadImages(randomFoodImgArr, function () {
    snake = new Snake();
    food = randomFood(snake);
    food.drawElement();
    loadImages(snakeImages, function () {

      console.log("MySnek is :", snake);
      snake.drawSnake();
    });
  });


  gameCanvas = new MyCanvas(); //create canvas object. canvas is global variable.
  gameCanvas.drawMyCanvas(); //then call drawMyCanvas method on canvasObject

  presentResult();




  //player.autoplay=true;




  document.getElementById("new-game").addEventListener("click", function () {
    location.reload();
  })

  addEventListener("keydown", pressedKey);

}