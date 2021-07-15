//var PLAY=1;
//var END=0;
var gameState = "play";

var boy , boy_running;
var goodThoughts , badThoughts, gtImage1, gtImage2, gtImage3, gtImage4, btImage1, btImage2, btImage3, btImage4, btImage5;
var gtGroup, btGroup;
var score = 0;
var life = 5;
var ground;
//var foodEaten ;
//var life ;
var restartPic;
var background, backgroundImage;
//var back1, back1Image;
//var  youWin,  youWinImage;
//var retryLabel, retryLabelImage;
//var winnerBoard, winnerBoardImage;
//Sounds
//var jumpSound;


function preload(){
//backgroundImage = loadImage("jungle[1].jpg");
  
boy_running = loadAnimation("sprite-1.png","sprite-2.png","sprite-3.png","sprite-4.png","sprite-5.png");
  
 gtImage1 = loadImage("GT-1.png");
 gtImage2 = loadImage("GT-2.png");
 gtImage3 = loadImage("GT-3.png");
 gtImage4 = loadImage("GT-4.png");
 gtImage5 = loadImage("GT-5.png");

 btImage1 = loadImage("BT-1.png");
 btImage2 = loadImage("BT-2.png");
 btImage3 = loadImage("BT-3.png");
 btImage4 = loadImage("BT-4.png");
 btImage5 = loadImage("BT-5.png");

 background = loadImage("background1.jpg");

  restartPic = loadImage("restart.png");
  /*
  back1Image = loadImage("design pic1.jpg");
  youWinImage = loadImage("youWin2.jpg");
  retryLabelImage = loadImage("retry label.png");
  //winnerBoardImage = loadImage("winning board.png");
  */
   //jumpSound = loadSound("Jump sound.mp3");
}

function setup() {
  createCanvas(810,600); 
  
   background = createSprite(0,0,740,500);
   background.addImage(backgroundImage);
   background.scale = 1.5
  
  boy = createSprite(150,580);
  boy.addAnimation("boyRun", boy_running);
  boy.scale = 0.6
  //boy.visible = false;

  ground = createSprite(450,590,1680,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.shapeColor = "green";
  console.log(ground.x)
  //ground.visible = false;
  
  restart = createSprite(355,345,40,40);
  restart.addImage("rsrt", restartPic);
  restart.scale = 0.6;
  restart.visible = false;
  
  gtGroup = new Group();
  btGroup = new Group();
  
  boy.debug = true;
  boy.setCollider("rectangle",0,0,boy.width,boy.height);
  /*
  foodEaten=0;
  survivalTime = 0;
  stoneHit = 0;
  life = 3;
  */
}


function draw() {
//background("cyan");
  //survivalTime = survivalTime+1;
  //gameState = "play";

  boy.collide(ground);

  if(gameState === "play"){
    
     if(ground.x<0) {
  ground.x=ground.width/2; 
       
  }
    
     background.velocityX = -8;
     if (background.x < 0){
       
       background.x = background.width/2;
     }
    
    //Making the Monkey Jump when Space pressed
    if(keyDown("space") && boy.y >= 310){
      boy.velocityY = -10.5;
      //jumpSound.play();
  }
    
    if(boy.isTouching(gtGroup)){
     gtGroup.destroyEach();  
     score = score+1
     //foodEaten=foodEaten+1;
     //restart.visible = true;
  }
  
  if(boy.isTouching(btGroup)){
    btGroup.destroyEach(); 
     life = life-1;
    //monkey.velocityY = 0;
     //ground.velocityX = 0;
     //obstacleGroup.setVelocityXEach(0);
     //monkey.destroy();
     //survivalTime = survivalTime-200;
     //foodEaten=foodEaten-1;
     //obstacle.velocityX = -5;
     //stoneHit = stoneHit+1;
     //monkey.scale=0.2
     
  if(ground.x<0) {
  ground.x=ground.width/2;  
       
  }
  }
    if(life === 0){
      gameState = "end";
    }

  //Gravity to boy
  boy.velocityY = boy.velocityY + 0.7;
  
  // Spawning Food & Obstacle
  gThoughts();
  bThoughts();
    
}
  
  if(gameState === "end"){
    
      gtGroup.destroyEach();
      btGroup.destroyEach();
     //retryLabel.visible = true;
     textSize(25);
    fill("black");
     text("Oops You Lost!", 250,210);
     //background.visible = false;  
     //background.velocityX = 0;
     restart.visible = true;
     score = 0;
     life = 5;   
     //stoneHit = 0;
     boy.visible = false;
    
     
  if(ground.x<0) {
  ground.x=ground.width/2;  
       
  }

     //obstacleGroup.setLifetimeEach(-1);  
     //FoodGroup.setLifetimeEach(-1);
     
    // obstacleGroup.setVelocityXEach(0);
    // FoodGroup.setVelocityXEach(0);  
   
  }

 if(mousePressedOver(restart)) {
      reset();
      restart.visible = false;
      //gameState = "play";
    }
  
    if(life===0){
      gameState = "end";   
     
   }   
  
 /*
  if(foodEaten === 15){
     //textSize(27);
     //fill("red");
     //text("You Win!",165,180); 
     //background("blue");
     //survivalTime = -1;
     //winnerBoard.visible = false;
     //ground.destroy();
     gameState = "end";
     youWin.visible = true;
     //text("Click Retry To Play Again", 70,210);
  }
  */

 // if(foodEaten < -1){
  //   textSize(24);
  //   stroke("black");
  //   fill("black");
  //   text("Oops You Lose", 130,170);
   //  gameState = "end";
    // monkey.destroy();
     //foodEaten = 0;
  //}
  
  //if(touches.restart)
  
  drawSprites();
  // score = score+1;
  stroke("white");
  strokeWeight(1);
  textSize(22);
  fill("black");
  text("Score: "+ score ,10,23);
  
  stroke("white");
  textSize(22);
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate())
  text("Life: " + life, 455, 23);

  //textSize(22);
  //fill("white");
  //text("Lives: " + life,11,50);
  
// monkey.collide(ground);

//function reset(){
 // gameState = "play";
 // restart.visible = false;
  
}

function gThoughts(){
  if (frameCount % 100 === 0){
    var goodThoughts = createSprite(600,165,10,40);
    goodThoughts.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: goodThoughts.addImage(gtImage1);
               break;
       case 2: goodThoughts.addImage(gtImage2);
               break;
       case 3: goodThoughts.addImage(gtImage3);
               break;
       case 4: goodThoughts.addImage(gtImage4);
               break;
       case 5: goodThoughts.addImage(gtImage5);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     goodThoughts.scale = 0.5;
     goodThoughts.lifetime = 300;
    
    //add each obstacle to the group
     gtGroup.add(goodThoughts);
  }
 }


 function bThoughts(){
  if (frameCount % 150 === 0){
    var badThoughts = createSprite(600,165,10,40);
    badThoughts.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: badThoughts.addImage(btImage1);
               break;
       case 2: badThoughts.addImage(btImage2);
               break;
       case 3: badThoughts.addImage(btImage3);
               break;
       case 4: badThoughts.addImage(btImage4);
               break;
       case 5: badThoughts.addImage(btImage5);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     badThoughts.scale = 0.5;
     badThoughts.lifetime = 300;
    
    //add each obstacle to the group
     btGroup.add(badThoughts);
  }
 }


function reset(){
  gameState = "play";
  restart.visible = false;
  //retryLabel.visible = false;
  boy.visible = true;
  //obstacleGroup.destroyEach();
  //FoodGroup.destroyEach();
  ground.velocityX = -4;
 // background.visible = true;    
  //youWin.visible = false;
  boy.collide(ground);
  
  if(ground.x<0) {
  ground.x=ground.width/2;  
       
  }
  
   boy.changeAnimation("boyRun", boy_running);
  
  score=0;
  //survivalTime = 0;
  life = 5;
  
  //survivalTime = survivalTime+1;
  
  background.velocityX = -8;
    if (background.x < 0){
       
      background.x = background.width/2;
    }
    
}