var $ = require('jquery');

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Enemy = require("./enemies.js");
var Bluecifer = require('./bluecifer');

var bluecifer = new Bluecifer (150, 150, 50, 41);

var enemy = new Enemy();
var enemy2 = new Enemy();

function newEnemy () {
  enemy.draw(ctx);
  enemy.moveLeftRandom();
}

function newEnemy2 () {

  setTimeout(function() {
    enemy2.draw(ctx);
    enemy2.moveLeftRandom();
    return enemy2;
  }, 3000);

}

function repeat () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bluecifer.draw(ctx);
  bluecifer.gravity();
  newEnemy();
  newEnemy2();
  detectFloorCollision();
  requestAnimationFrame(repeat);
}

setInterval(function () {
  requestAnimationFrame(repeat);
}, 2100);


function detectFloorCollision () {
  if (bluecifer.y > 350) {
    console.log("game over!");
    bluecifer.y = 300;
  }
}


$(document).on('keydown', function (e) {
  var code = e.keyCode || e.which;
  if (code === 32) {
    bluecifer.moveUp();
    detectCeilingCollision();
  } else {
    return false;
  }
});

function detectCeilingCollision () {
  if (bluecifer.y < 0) {
    bluecifer.y = bluecifer.y + 10;
  }
}
