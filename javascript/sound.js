function sound() {
 var  player = new Audio("./javascript/game.mp3");
  player.addEventListener('canplaythrough', function (event) {
    console.log(event)
  })
  return player;
}



player.src = "./javascript/game.mp3";
  // player.autoplay = true;
  // player.load();
  // player.addEventListener('canplaythrough', function (event) {
  //   // player.play()
  //   console.log(event);
  // })



  // // player.autoplay=true;