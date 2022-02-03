class Enemies{
    constructor(ctx,player){
        this.ctx = ctx;
        this.player = player;
        this.fireballArrayImg = []
        this.fireballsNumber = 50;
        this.fireballArray = []
        this.fireballInterval = 100; 
        this.fireballChangeDistance = Math.round(this.ctx.canvas.height * 0.125);
        this.playerLifes = 5;
        }

    generateEnemiesArray(){
        for (let i = 0; i < 8; i++) {
            const img = new Image();
            img.src = `./enemies/fireballs/Recurso ${i + 1}.png`;
            this.fireballArrayImg.push(img);
        }

        for(let i = 1; i <=this.fireballsNumber;i++){
            const obj = {};
            obj.x = (this.ctx.canvas.width/(this.fireballsNumber+1))*i
            obj.startPos = (this.ctx.canvas.width/(this.fireballsNumber+1))*i
            obj.y = -50;
            obj.speedY = 0;
            obj.grav = 0.007;
            obj.img = this.fireballArrayImg[0];
            obj.shot = false;
            obj.touched = false;
            this.fireballArray.push(obj);
        }
    }

    move(frameNumber){
        this.checkEnemiesCollision();
        this.fireballArray.forEach(obj =>{
            if(obj.shot){
                obj.x -= this.player.speedX;
                obj.speedY += obj.grav;
                obj.y += obj.speedY;
                if(frameNumber % 5 === 0)
                //console.log(this.fireballChangeDistance,obj.y)
                this.changeToNextImage(obj,this.fireballArrayImg);
            }
            if(obj.y > this.ctx.canvas.height){
                obj.shot = false;
                obj.y = -50;
                obj.x = obj.startPos;
                obj.img = this.fireballArrayImg[0];
            }
        })
    }

    draw(){
        this.fireballArray.forEach(obj =>{
            this.printSprite(obj)
        })
    }

    printSprite(obj){
        this.ctx.drawImage(obj.img, obj.x, obj.y,50,50)
      //  this.ctx.strokeRect(obj.x,obj.y,50,50)
    }

    randomFireball(framenumber){
        if(framenumber % this.fireballInterval === 0){
            const index = Math.floor(Math.random()*this.fireballsNumber)
            this.fireballArray[index].shot = true;
        }
    }

    changeToNextImage(obj,array){
        let actualIndex = array.indexOf(obj.img);
        if (actualIndex === array.length -1) actualIndex = -1;
        obj.img = array[actualIndex+1];
    }

    checkEnemiesCollision(){
        this.fireballArray.forEach(fireBall =>{
            //console.log(this.player.x, this.player.y, coin.x, coin.y)
            if(
                //this.player.x > coin.x
                this.player.x < fireBall.x + 50 &&
                this.player.x + this.player.width > fireBall.x &&
                this.player.y < fireBall.y + 50 &&
                this.player.y + this.player.height > fireBall.y &&
                fireBall.y > -25
            ){
                this.fireballArray.splice(this.fireballArray.indexOf(fireBall),1)
                this.playerLifes-=1;
                this.fireballsNumber--;
            }
        })
    }

}