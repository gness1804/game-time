const Bluecifer = require('../lib/bluecifer');
const assert = require('chai').assert;

describe('Bluecifer', function () {

  it('should be a function', function () {
    assert.isFunction(Bluecifer);
  });

  it('should instantiate Bluecifer', function () {
    var bluecifer = new Bluecifer();
    assert.isObject(bluecifer);
  });

  it('should take the first argument and set it as the "x" property of the instantiated object', function (){
    var bluecifer = new Bluecifer({x:15});
    assert.equal(bluecifer.x,15);
  });

  it('should take take the second argument and set it as the "y" property of the instantiated object', function () {
    var bluecifer = new Bluecifer({x:15, y:30});
    assert.equal(bluecifer.y, 30);
  });

  it('should take the third argument and set it as the "width" property of the instantiated object',
  function () {
    var bluecifer = new Bluecifer({x:15, y:30, width: 45});
    assert.equal(bluecifer.width, 45);
  });

  it('should take the fourth argument and set it as the "height" property of the instantiated object',
  function () {
    var bluecifer = new Bluecifer({x: 15, y: 30, width:45, height:60});
    assert.equal(bluecifer.height, 60);
  });

  describe ('bluecifer', function (){

    it('should have a method called "gravity()"', function () {
      var bluecifer = new Bluecifer(15, 30);
      assert.isFunction(bluecifer.gravity);
      });

    it('"gravity()" should increment the "y" property by 1', function () {
      var bluecifer = new Bluecifer({y: 30});
      bluecifer.gravity();
      assert.equal(bluecifer.y, 31);
    });

    it('should have a method called "moveUp()', function () {
      var bluecifer = new Bluecifer(15, 30);
      assert.isFunction(bluecifer.moveUp);
    });

    it('"moveUp()" should decrement the "y" property by 20', function () {
      var bluecifer = new Bluecifer({y:30});
      bluecifer.moveUp();
      assert.equal(bluecifer.y, 10);
    });

    it('should have a method called "topRight()"', function() {
      var bluecifer = new Bluecifer(15, 30, 45, 60);
      assert.isFunction(bluecifer.topRight);
    });

    it('"topRight()" should find the top right corner of Bluecifer', function () {
      var bluecifer = new Bluecifer({x:15, y:30, width:45});
      assert.equal(bluecifer.topRight().x, 60);
      assert.equal(bluecifer.topRight().y, 30);
    });

    it('should have a function called "bottomRight()"', function () {
      var bluecifer = new Bluecifer(15, 30, 45, 60);
      assert.isFunction(bluecifer.bottomRight);
    });

    it ('"bottomRight()" should find the bottom right corner of Bluecifer', function () {
      var bluecifer = new Bluecifer({x:15, y:30, width:45, height:60});
      assert.equal(bluecifer.bottomRight().x, 60);
      assert.equal(bluecifer.bottomRight().y, 90);
    });

});
});
