var dogimg, happyDogimg, database;
var foodS = 0;
var foodStock, dog ;

function preload()
{
  dogimg=loadImage("Dog.png")
  happyDogimg=loadImage("Happy Dog.png")
}

function setup() {
  createCanvas(500,500);

  database=firebase.database()

  foodStock=database.ref("Food")
  foodStock.on("value",readStock);
  dog=createSprite(250,250,10,10)

  dog.addImage("dogimg", dogimg)
  dog.addImage("dogHappy", happyDogimg);
  dog.scale=0.2
}


function draw() {  

  background(46, 139, 87)
  textSize(15)
  fill("black")
  text("NOTE - PRESS UP ARROW TO FEED DOGGY",100,450)

  textSize(20)
  text("FOOD REMAINING : "+ foodS, 150,50)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("dogHappy", happyDogimg);
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

database.ref('/').update({Food:x})
}



