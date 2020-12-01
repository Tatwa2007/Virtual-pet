var dog, dogImg;
var database;
var foods = 0;
var foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas (500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.1

  foodStock = database.ref ('food');
  foodStock.on ("value", readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(HappyDogImg)
}
if(keyWentUp(UP_ARROW)){
dog.addImage (dogImg);
}
  drawSprites();

  stroke ("black");
  fill ("black");
  textSize (20);
  text("Press up arrow to feed your pet", dog.x-80, dog.y-50)
  text("Food remaning: "+ foods, dog.x-80, dog.y-90);

}

function readStock(data){
  foods = data.val ();
}

function writeStock(x){
  if(x<=0){
  x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({food:x})
}


