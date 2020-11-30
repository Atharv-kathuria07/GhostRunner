var scene, sceneimg;
var ghost, ghostImg;

var gameState = "play";

var doorImg, climberImg, invisibleBlock;
var doorGroup, climberGroup;

var spooky;

function preload() {
  sceneimg = loadImage("tower.png");
   = loadImage()
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");


}

function setup() {
  createCanvas(600, 600)
  // spooky.loop();
  scene = createSprite(300, 300)
  scene.addImage(sceneimg)
  scene.velocityY = 1

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  doorGroup = createGroup()
  climberGroup = createGroup()
  invisibleBlockGroup = new Group();

}

function draw() {
  background(0)
  if (gameState === "play") {

    if (scene.y > 400) {
      scene.y = 300
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 3;

    }
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 3;

    }
    // ghost.collide(climberGroup);
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)) {
      gameState = "end"
    }

    spawnDoors();
    drawSprites();
  } else if (gameState === "end") {
    textStyle(BOLD)
    textSize(30);
    fill("gold");
    text('GAME OVER', 150, 250);
  }

}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x = Math.round(random(120, 400))
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.debug=true;
    invisibleBlock.height = 20;

    climber.addImage(climberImg);
    climber.x = door.x;
    invisibleBlock.x = climber.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    ghost.depth = door.depth + 1
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }

}