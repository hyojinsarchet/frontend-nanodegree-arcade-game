// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
      this.x = 0;
    }
    this.collisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collisions = function() {
    var enemyBox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
    var playerBox = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height
    };
    // check for enemy/player collision based on overlapping boundaries
    // helper reference: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (enemyBox.x < playerBox.x + playerBox.width &&
        enemyBox.x + enemyBox.width > playerBox.x &&
        enemyBox.y < playerBox.y + playerBox.height &&
        enemyBox.height + enemyBox.y > playerBox.y) {
            alert("Try again!");
            player.reset();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 410;
  this.width = 50;
  this.height = 50;
};

player.prototype.update = function(dt) {
    // make player stay in the screen
    if(this.x > 505 || this.x < 0 || this.y > 606 || this.y < -40){
      this.reset();
    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

player.prototype.handleInput = function (key) {
    switch(key){
      case 'left':
        this.x = this.x - 90;
        break;

      case 'right':
        this.x = this.x + 90;
        break;

      case 'up':
        this.y = this.y - 90;
        break;

      case 'down':
        this.y = this.y + 90;
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(-50, 40, 130),
  new Enemy(0, 130, 180),
  new Enemy(10, 220, 90)
];

var player = new player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode])
});
