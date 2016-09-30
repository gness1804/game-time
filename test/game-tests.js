const assert = require('chai').assert;
const Game = require('../lib/game.js');
const Bluecifer = require('../lib/bluecifer.js');
const Enemy = require('../lib/enemies.js');

describe ('Game', function() {
  context('createNewEnmies()', function() {

  it ('should be an array that stores enemies', function(){
    var game = new Game();
    assert.isArray(game.enemies, true);
  });

  it (' should create one enemy when "createNewEnemies()" is called', function () {
    var game = new Game();

    game.createNewEnemies();

    assert.equal(game.enemies.length, 1);
    assert.isObject(game.enemies[0]);
  });

  it ('method "createNewEnemies()" should create a max of 5 enemies', function () {
    var game = new Game();

    game.createNewEnemies();
    game.createNewEnemies();
    game.createNewEnemies();
    game.createNewEnemies();
    game.createNewEnemies();
    game.createNewEnemies();

    assert.equal(game.enemies.length, 5);
  });

  it ('method "createNewEnemies()" should not create enemy if scoreCounter % 100 === 1', function () {
    var game = new Game();
    game.scoreCounter = 1;
    game.createNewEnemies();

    assert.equal(game.enemies.length, 0);
  });
  });

  context('detectEnemyCollision()', function() {
    it('when Bluecifer collides with an enemy, game.active is set to false ', function() {
      var game = new Game();
      game.enemies.push(new Enemy({x: 1, y:10, width: 30, height: 30}));
      game.bluecifer = new Bluecifer({x: 1, y: 10, width: 10, height:10});
      game.detectEnemyCollision();
      assert(game.active===false, "Game.active is false");
    });

    it('when Bluecifer does not collide with an enemy, game.active is set to true ', function() {
      var game = new Game();
      game.enemies.push(new Enemy({x: 1, y:2 ,height: 35, width: 34}));
      game.bluecifer = new Bluecifer({x: 7, y: 40, height: 41, width: 40});
      game.detectEnemyCollision();
      assert(game.active, true);
    });
  });
});
