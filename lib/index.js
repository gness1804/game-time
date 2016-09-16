var $ = require('jquery');

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Enemy = require("./enemies.js");
var Bluecifer = require('./bluecifer');
// var enemy3 = new Enemy();
var enemy2 = new Enemy();
var enemy = new Enemy();
var bluecifer = new Bluecifer (150, 150, 50, 41);

var enemiesArray = [];

setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bluecifer.draw(ctx);
  enemy.draw(ctx);
  enemiesArray.push(enemy);
  enemy2.draw(ctx);
  enemiesArray.push(enemy);
  enemy.moveLeftRandom();
  enemy2.moveLeftRandom();
  bluecifer.gravity();
  // putNewEnemiesOnPage();
}, 10); //end of setInterval function

setInterval(function () {
  takeEnemyOutOfArray();
  detectFloorCollision();
  createNewEnemies();
}, 1000); //end of second setInterval function

function detectFloorCollision () {
  if (bluecifer.y > 350) {
    alert("Game Over!");
    bluecifer.y = 300;
  }
}

function createNewEnemies () {
  if (enemiesArray[0] === undefined) {
      setTimeout(function () {
          var enemy3 = new Enemy();
          enemy3.draw(ctx);
          enemiesArray.push(enemy3);
          enemy3.moveLeftRandom();
      }, 500);

    }
}

function takeEnemyOutOfArray() {
  for (var i = 0; i < enemiesArray.length; i++) {
    if (enemiesArray[i].x < 0) {
      enemiesArray.splice(0, 2);
    }
  }
} //end of takeEnemyOutOfArray

// function putNewEnemiesOnPage() {
//   if (enemiesArray[0] === undefined) {
//     setTimeout(function () {
//       var counter = 10;
//         enemy3.draw(ctx);
//         enemiesArray.push(enemy3);
//         enemy3.moveLeftRandom();
//     }, 500);
//
//   }
// } // end of putNewEnemiesOnPage

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
