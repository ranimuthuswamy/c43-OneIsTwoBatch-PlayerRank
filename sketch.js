var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obstacles;
var passedFinish;
var finishedPlayers = 0;

var form, player, game;

var cars, car1, car2, car3, car4, f1, w, h;
var track, car1_img, car2_img, car3_img, car4_img, f2;
var xVel, yVel, s;
var bronze_img, silver_img, gold_img;

function preload() {
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  f2 = loadImage("images/f1.png");
  s = loadSound("sounds/sliding.mp3");
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
  xVel = 0;
  yVel = 0;
  obstacles = createGroup();
  game = new Game();
  game.getState();
  game.start();

  for (var i = 0; i < 5; i++) {
    w = random(200, 950);
    h = (-height * 4, height - 300);
    f1 = createSprite(w, h);
    f1.addImage("f1", f2);
    obstacles.add(f1);
  }
}

function draw() {
  if (playerCount === 4 && finishedPlayers === 0) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (finishedPlayers === 4) {
    game.update(2);
  }
  if (gameState === 2 && finishedPlayers === 4) {
    game.displayRanks();
  }
}
