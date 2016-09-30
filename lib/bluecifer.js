function Bluecifer (options) {
  options = options || {};
  this.x = options.x || 150;
  this.y = options.y || 150;
  this.width = options.width || 50;
  this.height = options.height || 41;
  this.image = "IMGS/blue.png";
  this.gravityState = 1;
}

Bluecifer.prototype.draw = function(ctx) {
  var image = new Image();
  image.src = this.image;
  ctx.drawImage(image, this.x, this.y, this.width, this.height);
  return this;
};

Bluecifer.prototype.moveUp = function() {
  this.y = this.y - 20;
};

Bluecifer.prototype.gravity = function() {
  this.y += this.gravityState;
};

Bluecifer.prototype.topRight = function() {
  var x = this.x + this.width;
  var y = this.y;
  return {x: x, y: y};
};

Bluecifer.prototype.bottomRight = function() {
  var x = this.x + this.width;
  var y  = this.y + this.height;
  return {x: x, y: y};
};

module.exports = Bluecifer;
