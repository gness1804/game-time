var $ = require('jquery');

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Enemy = require("./enemies.js");
var Bluecifer = require('./bluecifer');
var enemy2 = new Enemy();
var enemy = new Enemy();
var bluecifer = new Bluecifer (150, 150, 50, 41);


setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bluecifer.draw(ctx);
  enemy.draw(ctx);
  enemy2.draw(ctx);
  enemy.moveLeftRandom();
  enemy2.moveLeftRandom();
  bluecifer.gravity();
  var x = Math.random();
  if (x > 0.95) {
    
  }
  // Zeus.draw(ctx)
  // Zeus.characterMove() -- gravity enemies.move()

  //if no plane on screen, generate a new plane and move it left
}, 10);

$(document).on('keydown', function (e) {
  var code = e.keyCode || e.which;
  if (code === 32) {
    bluecifer.moveUp();
  } else {
    return false;
  }
});

function createMultiplePlanes () {

}

// Zeus() {
// this.enemiesArray = []
// this.bluecifer = new Bluecifer()
//
// }

// if (bluecifer.collision(enemy)) {
//
// }
//Zeus.draw() {
 //this.enemies.forEach() {
 //enemy.draw()
 //nemy.move()
//}
// this.bluecifer.draw()
//}
