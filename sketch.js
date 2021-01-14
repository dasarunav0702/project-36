var database, dog, happyDog, dogImg, happyDogImg;
var foodS, foodStock;
var lastFed,fedTime;
var feedDog;
var foodObj;

function preload()
{
  dogImg= loadImage("images/dogImg.png");
  happyDogImg= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800, 500);

  dog = createSprite(650,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  food= new Food();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

}


function draw() {  
  background(46,139,87);
  
  drawSprites();
  food.display();
  fill (255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed+"AM",350,30);
  }

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
   
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
})
}
