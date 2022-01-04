var Corona,Corona_running,Corona_collided,Coronaimg,gameOverimg,restartimg;
var sadcorona;
var ground,invisibleGround;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0;
var count=0;
var PLAY=1;
var gameOver,restart;
var gameState=PLAY;
var END=0;

localStorage["HighestScore"] = 0;

function preload(){
    Coronaimg=loadImage("corona.png");
    gameOverimg=loadImage("GameOver.png");
    restartimg=loadImage("Restart.png");

    sadcorona=loadImage("sadcorona.png");

  obstacle1 = loadImage("vaccine.png");
  obstacle2 = loadImage("vaccine.png");
  obstacle3 = loadImage("vaccine.png");
  obstacle4 = loadImage("vaccine.png");
  obstacle5 = loadImage("vaccine.png");
  obstacle6 = loadImage("vaccine.png");
  
}
function setup(){
    createCanvas(1000,500);
    
    Corona=createSprite(50,450,150,150);
    Corona.addImage(Coronaimg);
   // Corona.addImage(sadcorona);
    Corona.scale=0.15;

  ground = createSprite(500,500,1500,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverimg);

  restart = createSprite(300,140);
  restart.addImage(restartimg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,500,500,20);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}
function draw(){
  background(255,255,254);
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && Corona.y >= 159) {
      Corona.velocityY = -12;
    }
  
    Corona.velocityY = Corona.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(Corona)){
        gameState = END;
    } 
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    Corona.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    Corona.addImage(sadcorona);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  Corona.collide(invisibleGround);
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,400,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  Corona.addImage(Coronaimg);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

