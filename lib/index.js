var $ = require('jquery');

var Enemy = require('./enemies');
var Game = require("./game.js");

var enemy = new Enemy();
var game = new Game();

var startGame = $('#start-game');
var gameOver = $('#game-over');
var youWin = $('#you-win');
var finalScore = $("#final-score-display");

function hideStartScreen () {
  startGame.css('visibility', 'hidden');
}

function showStartScreen () {
  startGame.css('visibility', 'visible');
}

function hideGameOverScreen () {
  gameOver.css('visibility', 'hidden');
}

function hideYouWinScreen () {
  youWin.css('visibility', 'hidden');
}

function clearFinalScore () {
  finalScore.text("");
}

showStartScreen();

function repeat() {
  if (game.active === true) {
    setTimeout(function() {
    requestAnimationFrame(repeat);
    game.repeat();
    }, 1000 / 100);
  }
}

function restoreGameToOriginalState () {
  hideStartScreen();
  hideGameOverScreen();
  hideYouWinScreen();
  clearFinalScore();
}

function restartEnemiesAndSongs () {
  enemy.increaseCounter();
  game.pauseCelebration();
  game.playThemeSong();
}

$("#start-game, #game-over, #you-win").on("click", function () {
    restoreGameToOriginalState();
    game.startGame();
    repeat();
    restartEnemiesAndSongs();
});

$(document).on("keydown", function (key) {
  if (key.which === 32) {
    if (startGame.css('visibility', 'hidden')) {
      game.bluecifer.moveUp();
      game.detectCeilingCollision();
    }
    else {
      game.resetGame();
    }
  } //end of space bar options
  else if (key.which === 13) {
      game.pauseThemeSong();
  } //end of enter option
  else if (key.which === 85) {
    var code = prompt("Enter cheat code");
    game.cheat(code);
  } //end of u keypress option
});
