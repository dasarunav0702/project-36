class Food {
    constructor(x, y, width, height) {
        var options = {
            isStatic:true,
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image=loadImage("images/Milk.png")
        World.add(world, this.body);
      }
      display(){
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;1++){
                if(1%10==0){
                    x=80;
                    y=y+50
                }
                this.image(this.image,x,y,50,50);
                x=x+30;
            }
        }
      }
    };