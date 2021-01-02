var PLAY 
var SERVE
var END 
var gameState
var man, corona, ins, newYear, bye20, newyear, game, restart, gameOver, start, bk
var manA, manc, coronaI, insI, newYearI, bye20I, newyearI, gameI, restartI, gameOverI, startI, bkI

var coronaGroup;
var insGroup;

var score = 0;

function preload(){
manA = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png")
manc = loadAnimation("man1.png");
coronaI = loadImage("Corona.png");
insI = loadImage("Injection.png");
newYearI = loadImage("HAPPY NEW YEAR.png");
bye20I = loadImage("Bye 2020.png");
newyearI = loadImage("New year.jpg");
gameI = loadImage("Newyeargame.png");
restartI = loadImage("restart.png")
gameOverI = loadImage("GameOver.png");
startI = loadImage("start.png");
bkI = loadImage("background.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  PLAY = 1;
  SERVE = 2;
  END = 0;
  gameState = 2;

  bk = createSprite(width,height/1.8,width,height);
  bk.addImage(bkI);
  bk.scale=width/1000
  bk.visible=false;

  man = createSprite(width/6,height/1.3);
  man.addAnimation("running",manA);
  man.addAnimation("collide",manc)
  man.scale=width/1600
  man.visible=false;

  insGroup = new Group();

  coronaGroup = new Group();

  newYear = createSprite(width/2,height/2+width);
  newYear.addImage(newYearI)
  newYear.scale=width/1500;
  // newYear.visible=false;

  bye20 = createSprite(width/2,height/2)
  bye20.addImage(bye20I);
  bye20.scale=width/1000
  // bye20.visible=false;

  newyear = createSprite(width/6,height/6)
  newyear.addImage(newyearI);
  newyear.debug=true
  newyear.scale=width/2000
  newyear.visible=false;

  game = createSprite(width/1.2,height/6)
  game.addImage(gameI);
  game.scale=width/2000;
  game.visible=false;

  restart = createSprite(width/2,height/2+1000)
  restart.addImage(restartI);
// restart.debug=true;
  gameOver = createSprite(width/2,height/2+1000)
  gameOver.addImage(gameOverI);

  start = createSprite(width/2,height/2+10000);
  start.debug=true
  start.addImage(startI);
  start.scale=width/6000;
  // start.visible=false;
 
}

function draw(){
  background("white");
  drawSprites();

  if(gameState===2){

   

    if(touches.length>0||mousePressedOver(bye20)||keyDown("N")){
      bye20.destroy();
      newYear.y=height/2
      touches=[];
    }
    if(touches.length>0||mousePressedOver(newYear)||keyDown("S")){
      newYear.destroy();
      start.y=height/2;
      newyear.visible=true
      game.visible=true
      touches=[]
    }
    if(touches.length>0||mousePressedOver(start)){
      gameState=1;
      touches=[]
    }
  }
  if(gameState===1){
    fill("blue")
    stroke("red")
    textSize(width/50)
    text("Score "+score,width/2,height/6);
    cor();
    start.destroy();

    man.visible=true;
    bk.visible=true;
    bk.velocityX=-10

    if(bk.x<width/90){
    bk.x=width;
    }

    if(touches.length>0||keyWentDown("space")){
      arrow();
      touches=[]
    }

    if(insGroup.isTouching(coronaGroup)){
      score = score+1;
      coronaGroup.destroyEach();
      insGroup.destroyEach();
    }

    if(man.isTouching(coronaGroup)){
      gameState=0;
      restart.y=height/2+100
      gameOver.y=height/2
    }
  }
  if(gameState===0){
    man.changeAnimation("collide",manc)
    bk.velocityX=0;
    coronaGroup.setVelocityXEach(0);
    coronaGroup.setLifetimeEach(-1);
    score = 0;
  }

  if(gameState===0&&touches.length>0||mousePressedOver(restart)){
    coronaGroup.destroyEach();
    man.changeAnimation("running",manA);
    gameOver.y=height/2+1000
    restart.y=height/2+1000
    gameState=1;
    touches=[];
  }
  
  
  
}
function cor(){
  if(frameCount%100===0){
    corona = createSprite(width+20,man.y);
    corona.addImage(coronaI);
    corona.scale=width/4000;
    corona.velocityX=-10

    coronaGroup.add(corona);
  }
}
function arrow(){
  ins = createSprite(man.x,man.y)
  ins.addImage(insI);
  ins.scale=width/3000
  ins.velocityX=10
  ins.lifetime=150;

  insGroup.add(ins)
  // ins.visible=false;
}