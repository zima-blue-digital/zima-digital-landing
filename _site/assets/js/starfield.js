// Variables
var totalObjects = 500;
var maxVelocity = .125;
var starSize = 2;
var twinkleFreq = 200000;
var shootingStarFreq = 75;
var shootingStarVelocity = 150;
var shootingStarSize = 1;

// Notify browser we want to do an animation
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            setInterval(callback, 75);
          };
})();

// DOM Elements
var canvas = document.getElementById('starfield');
var wrapper = document.querySelector('.intro_wrapper');

// Canvas Dimensions
canvas.width = wrapper.offsetWidth;
canvas.height = wrapper.offsetHeight;
var ctx = canvas.getContext("2d");

// Empty Arrays
var stars = [];
var shootingStars = [];
this.init();

// Interval Setting
setInterval(update, 30);
requestAnimFrame(draw);

// Initialization Function
function init() {
  for(i = 0; i < totalObjects; i++) {
    stars.push(new Star(i));
  }
}

// Draw Canvas
function draw() {
  requestAnimFrame(draw);
  
  ctx.fillStyle = "rgba(255, 255, 255, .5)";
  ctx.fillRect (0, 0, canvas.width, canvas.height);

  for (f = 0; f < stars.length; f++) {
    stars[f].Update();
    stars[f].Draw();
  }
  
  for (f = 0; f < shootingStars.length; f++) {
    shootingStars[f].Update();
    shootingStars[f].Draw();
  }
}

function update() {
  if (Math.round((Math.random() * shootingStarFreq)) === 1) {
    shootingStars.push(new ShootingStar());
  }
  
  for(f = 0; f < shootingStars.length; f++) {
    if (shootingStars[f].X < -1000) {
      shootingStars.splice(f, 1);
    }
  }
}


function Star(i) {
  this.starSize = Math.random() * starSize
  this.X = Math.random() * canvas.width;
  this.Y = Math.random() * canvas.height;
  this.Velocity = (Math.random() * maxVelocity);
  
  this.Update = function() {
    this.X -= this.Velocity;
    this.Y += this.Velocity * .5;
    if (this.X < 0 || this.Y > canvas.height) {
      this.X = Math.random() * canvas.width * 2;
      this.Y = Math.random() * canvas.height;
    }
  };
  
  this.Draw = function() {
    ctx.fillStyle = "rgba(10, 33, 65, 1)"
    ctx.beginPath();
    ctx.arc(this.X, this.Y, this.starSize, 0, 2 * Math.PI);
    this.draw = true
    ctx.fill();
  };
}

function ShootingStar() {
  this.X = canvas.width;
  this.Y = Math.random() * canvas.height;
  this.Length = 1000;
  
  this.Update = function() {
    this.X -= shootingStarVelocity;
  };
  
  this.Draw = function() {
    for (var i = 0; i < this.Length; i++){
      opacity = (0.8 - (0.001 * i));
      ctx.fillStyle = "rgba(10, 33, 65, 1)"
      ctx.fillRect(this.X + i, this.Y, shootingStarSize, shootingStarSize);
    }
  };
}