class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width / 2;

        this.speedX = 0;
        this.speedY = 0;

        this.width = 80;
        this.height = 90;
        this.floorHeight = 28;
        this.y = 0;//ctx.canvas.height - this.height - this.floorHeight;

        this.imgRefactor = 0.3;

        this.spriteCounter = 0;
        this.spriteSpeed = this.speedX;

        this.onMove = false;
        this.keyDown = false;
        this.onGround = false;

        this.sideContact = false;
        this.upContact = false;

        this.sideContactPrev = false;
        this.upContactPrev = false;

        this.drag = 0.99;
        this.grav = 0;

        this.jumpAF = null;

        this.moveSpeed = 5;

        this.movements = {
            up: false,
            right: false
        }

        this.runSpritesArray = []
        this.jumpSpritesArray = []
    }

    generateSpritesArrays() {

        for (let i = 0; i < 8; i++) {
            const img = new Image();
            img.src = `./character/run/Recurso ${i + 1}.png`;
            this.runSpritesArray.push(img);
        }

        for (let i = 0; i < 7; i++) {
            const img = new Image();
            img.src = `./character/jump/Recurso ${i + 1}.png`;
            this.jumpSpritesArray.push(img);
        }
    }
    goUp() {
        this.movements.up = true
    }

    goRight() {
        this.movements.right = true;
    }
    
    move(frameNumber) {
        if(this.speedY>0) this.upContact = false;
        this.spriteSpeed = this.speedX;
        
        //console.log(this.speedY)
        //console.log(this.movements.up)
        console.log(this.upContact,this.checkFloorContact())
        if (this.movements.up) {
            this.jump();
            this.movements.up = false;
        }

        if (this.movements.right) this.speedX = this.moveSpeed;
        else this.speedX = 0;

        this.speedY += this.grav;
        this.y += this.speedY;

        if (this.checkFloorContact()) this.y = this.ctx.canvas.height - this.height - this.floorHeight;  // place on ground
    }

    stopRight() {
        this.movements.right = false;
    }


    draw(frameNumber) {

        if(this.movements.right && (this.checkFloorContact() || this.upContact)) this.printRunsprites(frameNumber)
        else if(!this.checkFloorContact() && !this.upContact) this.printJumpSprites(frameNumber)
        else this.printStandSprite();
    }

    printRunsprites(frameNumber) {
        const imgToPrint = this.runSpritesArray[this.spriteCounter];
        if (frameNumber % this.spriteSpeed == 0) {
            this.spriteCounter++;
            this.spriteCounter =  this.spriteCounter === 8 ?  0 : this.spriteCounter;
        }
        this.printSprite(imgToPrint);
    }

    printJumpSprites(frameNumber){
      /*  const imgToPrint = this.jumpSpritesArray[this.spriteCounter];
        if (frameNumber % this.spriteSpeed == 0) {
            this.spriteCounter++;
            this.spriteCounter =  this.spriteCounter === 7 ?  0 : this.spriteCounter;
        }
        this.printSprite(imgToPrint);*/
        console.log(this.speedY)
        if(this.speedY < -8) this.printSprite(this.jumpSpritesArray[1])
        else if(this.speedY < -1 && this.speedY >= -8) this.printSprite(this.jumpSpritesArray[2])
        else if(this.speedY < 3 && this.speedY >= -1) this.printSprite(this.jumpSpritesArray[3])
        else this.printSprite(this.jumpSpritesArray[4])
    }

    printStandSprite(){
        this.printSprite(this.runSpritesArray[0])
    }
    printSprite(img) {
        this.ctx.drawImage(img,26,67,this.width,this.height, this.x, this.y, this.width,this.height)
       // this.ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    jump() {
        console.log("jumping")
        this.spriteCounter = 0
        this.speedY = -10;
        this.upContact = false;
    }

    checkFloorContact() {
        let onGround = false
        if (this.y + this.height >= this.ctx.canvas.height - this.floorHeight) {
            // has hit ground
            onGround = true;
            this.speedY = 0;
        }
        return onGround
    }

    checkUpperContact(obj) {

        return (this.x + this.width > obj.x &&
            this.x < obj.x + obj.width &&
            this.y + this.height >= this.ctx.canvas.height - obj.height - this.floorHeight
        )
    }
    //this.y + 100 >= this.ctx.canvas.height-28-obj.height


    checkSideContact(obj) {

        return (this.x + this.width >= obj.x &&
            this.x < obj.x &&
            this.y <= this.ctx.canvas.height - this.floorHeight &&
            this.y + this.height > this.ctx.canvas.height - obj.height - this.floorHeight)

    }

    checkContact(objects) {
        objects.forEach(obj => {

            if (this.checkSideContact(obj)) {
                this.speedX = 0;
                this.x = obj.x - this.width
                this.sideContact = true;

               // console.log("Contact Side")
            }
            else if (this.checkUpperContact(obj)) {
                this.y = this.ctx.canvas.height - obj.height - this.floorHeight - this.height;
                this.speedY = 0;
                cancelAnimationFrame(this.jumpAF);
                this.onGround = true;
                this.upContact = true;
                obj.color = "green"
              // console.log("Contact Up")
            }

            else {
                //if(this.onGround && !this.upContact) this.y = this.ctx.canvas.height - this.height - this.floorHeight
                this.sideContact = false;
               // this.upContact = false;


            }
        })

    }

    exitsCanvas() {
        return this.y > this.ctx.canvas.height || this.y + this.height < 0;
    }
}
