var $ = require('jquery');

var counter = 0;

function Enemy (options) {
  this.options = options || {};
  this.x = this.options.x || 800;
  this.y = this.options.y || this.randomY();
  this.width = this.options.width || 50;
  this.height = this.options.height || 35;
  this.image = this.options.image || "IMGS/airplane.png";
  this.speed = this.options.speed || this.randomSpeed();
}

Enemy.prototype.resetCounter = function() {
  counter = 0;
};

Enemy.prototype.increaseCounter = function() {
  counter++;
};

Enemy.prototype.randomY = function() {
  var min = 0;
  var max = 300;
  return randomize(min, max);
};

Enemy.prototype.randomSpeed = function() {
  this.increaseCounter();
  var min;
  var max;

  if (counter < 1000) {
    min = 0.5;
    max = 3;
    assignGameScoreColor("black");
  }
  else if (counter < 2000){
    min = 1.5;
    max = 3;
    assignGameScoreColor("green");
  }
  else if (counter < 3000){ //six seconds
    min = 2.5;
    max = 4;
    assignGameScoreColor("rgb(153, 152, 25)");
  }
  else if (counter < 4000){
    min = 3.5;
    max = 5;
    assignGameScoreColor("red");
  }
    else if (counter < 5000){
    min = 4.5;
    max = 6;

  }

  return randomize(min, max);

}; //end of randomSpeed()

function assignGameScoreColor (color) {
  $('#game-score').css("color", color);
}

function randomize (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Enemy.prototype.draw = function (ctx) {
  var image = new Image();
  image.src = this.image;
  ctx.drawImage(image, this.x, this.y, this.width, this.height);
  return this;
};

Enemy.prototype.moveLeftRandom = function () {
    this.x = this.x - this.randomSpeed();
    if (this.x < 0){
      this.x = 800;
      this.y = this.randomY();
    }
};

Enemy.prototype.bottomRight = function () {
  var x = this.x + this.width;
  var y  = this.y + this.height;
  return {x: x, y: y};
};

module.exports = Enemy;
