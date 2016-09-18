var $ = require('jquery');

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Enemy = require("./enemies.js");
var Bluecifer = require('./bluecifer');

var bluecifer = new Bluecifer (150, 150, 50, 41);

$('#game-over').css('visibility', 'visible');

var themeSong = document.getElementById("theme-song");

var enemy = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

function drawAirport () {
  var image = new Image();
  image.src = "IMGS/dia-photo.jpg";
  var airport = {};
  airport.x = 150;
  airport.y = 340;
  airport.width = 30;
  airport.height = 30;
  ctx.drawImage(image, airport.x, airport.y, airport.width, airport.height);
  airportCollision(airport, bluecifer);
  return this;
}

function newEnemy () {
  enemy.draw(ctx);
  collision(enemy, bluecifer);
  enemy.moveLeftRandom();
}

function newEnemy2 () {
  enemy2.draw(ctx);
  collision(enemy2, bluecifer);
  setTimeout(function() {
    enemy2.moveLeftRandom();
    return enemy2;
  }, 3000);
}

function newEnemy3 () {
  enemy3.draw(ctx);
  collision(enemy3, bluecifer);
  setTimeout(function() {
    enemy3.moveLeftRandom();
    return enemy3;
  }, 6000);
}

function collision(a, b) {
  if (((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width))) {
  //if there is no collision
  }
  else {
    themeSong.pause();
    $('#game-over').css('visibility', 'visible');
    resetGame();
  }
} //end of collision function

function airportCollision (a, b) {
  if (((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width))) {
  //if there is no collision
  }
  else {
    themeSong.pause();
    alert("You win!");
    resetGame();
  }
} //end of airportCollision function

function repeat () {
  setTimeout(function() {
    requestAnimationFrame(repeat);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bluecifer.draw(ctx);
    bluecifer.gravity();
    newEnemy();
    newEnemy2();
    newEnemy3();
    detectFloorCollision();
  }, 1000 / 50);
    keepScore();
} //end of big repeat function

$(document).on("click", function () {
  themeSong.play();
  $('#game-over').css('visibility', 'hidden');
  repeat();
});

var scoreCounter = 0;

function keepScore() {
    var currentScore = scoreCounter++;
    if (currentScore <= 100){
   $('#game-score').text("000" + currentScore);
 }else if (currentScore <= 1000){
  $('#game-score').text("00" + currentScore);
}else if (currentScore <= 10000){
  $('#game-score').text("0" + currentScore);
  drawAirport();
}else{
  $('#game-score').text(currentScore);
  }
}

function detectFloorCollision () {
  if (bluecifer.y > 350) {
    themeSong.pause();
    resetGame();
    bluecifer.y = 300;
  }
}

$(document).on("keydown", function (key) {
  if (key.which === 32) {
    if ($('#game-over').css('visibility', 'hidden')) {
      bluecifer.moveUp();
      detectCeilingCollision();
    }
    else {
      resetGame();
    }
  } //end of if statement for space bar
  else if (key.which === 13) {
    themeSong.pause();
  } // end of if statement for enter key
  else if (key.which === 85) {
    prompt("Enter cheat code");
  }
}); //end of entire function

function detectCeilingCollision () {
  if (bluecifer.y < 0) {
    bluecifer.y = bluecifer.y + 20;
  }
}

function resetGame () {
  alert("Game over! Your score was " + scoreCounter);
  location.reload();
  $('#game-over').css('visibility', 'hidden');
  repeat();
}
