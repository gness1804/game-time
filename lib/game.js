var $ = require('jquery');

var canvas = document.getElementById("canvas");

var Enemy = require("./enemies.js");
var Bluecifer = require('./bluecifer');

var enemy = new Enemy();

var gameScore = $('#game-score');
var startGame = $("#start-game");
var youWin = $('#you-win');
var gameOver = $('#game-over');
var finalScore = $("#final-score-display");

function showStartScreen () {
  startGame.css('visibility', 'visible');
}

function showWinScreen () {
  youWin.css('visibility', 'visible');
}

function showGameOver () {
  gameOver.css('visibility', 'visible');
}

function Game() {
  this.themeSong = new Audio("music/spark-mandrill.mp3");
  this.celebration = new Audio("music/celebration.mp3");
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.bluecifer = new Bluecifer();
  this.active = true;
  this.enemies = [];
  this.collisionCanHappen = true;
  this.scoreCounter = 0;
}

Game.prototype.repeat = function() {
    var blueciferY = this.bluecifer.y;
    this.clearCanvas();
    this.bluecifer.draw(this.ctx);
    this.bluecifer.gravity();
    this.detectFloorCollision();
    this.setUpEnemies(blueciferY);
    this.keepScore();
};

Game.prototype.setUpEnemies = function (blueciferY) {
  this.createNewEnemies();
  this.drawEnemiesFromArray(blueciferY);
  this.detectEnemyCollision();
};

Game.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.bluecifer = function() {
  this.bluecifer.draw(this.ctx);
};

Game.prototype.blueciferGravity = function() {
  this.bluecifer.gravity();
};

Game.prototype.createNewEnemies = function() {
if (this.scoreCounter % 100 === 0){
  if (this.enemies.length < 5){
    this.enemies.push(new Enemy());
    }
  }
};

Game.prototype.drawEnemiesFromArray = function(blueciferY) {
  var theBigY = blueciferY;
  var blues = {};
  blues.x = 150;
  blues.y = theBigY;
  blues.width = 50;
  blues.height = 35;

  this.enemies.forEach(function(enemy) {
    enemy.moveLeftRandom();
    enemy.draw(canvas.getContext("2d"));
  });
};

Game.prototype.detectEnemyCollision = function() {
  var b = this.bluecifer;
  var self = this;
  this.enemies.forEach(function(enemy) {
    var blueciferBottomLeft = b.y + b.height;

    var enemyTopRight = enemy.x + enemy.width;

    var blueciferTopRight = b.x + b.width;

    var enemyBottomLeft = enemy.y + enemy.height;

    if ((enemyBottomLeft < (b.y)) || (enemy.y > blueciferBottomLeft) || (enemyTopRight < b.x) || (enemy.x > (blueciferTopRight)) || self.collisionCanHappen === false) {
    }
    else {
      self.gameOver();
    }
  });
};

Game.prototype.detectCeilingCollision = function() {
  if (this.bluecifer.y < 0) {
    this.bluecifer.y = this.bluecifer.y + 20;
  }
};

Game.prototype.detectFloorCollision = function() {
  if (this.bluecifer.y > 350) {
    this.gameOver();
    this.pauseThemeSong();
  }
};

Game.prototype.startGame = function() {
  this.scoreCounter = 0;
  enemy.resetCounter();
  this.bluecifer.y = 100;
  this.active = true;
};

Game.prototype.keepScore = function() {
  var currentScore = this.scoreCounter++;
  if (currentScore <= 100){
    gameScore.text("000" + currentScore);
  } else if (currentScore <= 1000){
    gameScore.text("00" + currentScore);
  } else if (currentScore <= 10000){
    gameScore.text("0" + currentScore); //when they beat the game
    this.youWin();
  } else {
    this.showCurrentScore(currentScore);
  }
};

Game.prototype.youWin = function () {
  this.enemies.length = 0;
  this.active = false;
  showStartScreen();
  showWinScreen();
  this.pauseThemeSong();
  this.playCelebration();
};

Game.prototype.showCurrentScore = function (currentScore) {
  gameScore.text(currentScore);
};

Game.prototype.gameOver = function() {
  showGameOver();
  this.enemies.length = 0;
  this.active = false;
  this.pauseThemeSong();
  this.showFinalScore();
};

Game.prototype.showFinalScore = function () {
  finalScore.text("Your final score was " + this.scoreCounter);
};

Game.prototype.playThemeSong = function () {
  this.themeSong.play();
};

Game.prototype.pauseThemeSong = function () {
  this.themeSong.pause();
};

Game.prototype.playCelebration = function () {
  this.celebration.play();
};

Game.prototype.pauseCelebration = function () {
  this.celebration.pause();
};

Game.prototype.cheat = function (code) {
  if (code === "dogs") {
    this.collisionCanHappen = false;
    alert("Cheat mode activated!");
  }
  else {
    alert("Nope, wrong code!");
  }
};

module.exports = Game;
