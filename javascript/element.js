//Element constructor. It is the same for snake elements and food elements.

function Element(name, x, y, imgSrc) {
  this.name = name;
  this.positionX = x;
  this.positionY = y;
  this.img = new Image();
  this.img.src = imgSrc;

}


Element.prototype.drawElement = function () {

  gameCanvas.context.drawImage(this.img, this.positionX, this.positionY, 50, 50);

}