class Background {
    constructor(ctx,ctxGame,player) {
        this.ctx = ctx;
        this.ctxGame = ctxGame;
        this.player = player;

        this.backgroundFront = {
            img: new Image(),
            width: this.ctxGame.canvas.width,
            height: this.ctxGame.canvas.height,
            x: 0,
            y: 0,
            vx: -1,
            vy: 0
        }

        this.backgroundFront.img.src = "./images/city.jpg";

        this.backgroundFar = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x:0,
            y:150,
            vx: -0.5,
            vy: 0
        }
        this.backgroundFar.img.src = "./images/skyline.png"
    }

    move(frameNumber) {

        if(this.player.x > 0 && this.player.speedX > 0){

       this.backgroundFront.x -= this.player.speedX;
       if(this.backgroundFront.x + this.backgroundFront.width <=0)
       this.backgroundFront.x = 0;
        
    }
       
       this.backgroundFar.x += this.backgroundFar.vx;
        if(this.backgroundFar.x + this.backgroundFar.width <=0)
        this.backgroundFar.x = 0

    }

    draw(frameNumber) {

        //Far bg 1° piece
        this.ctx.drawImage(
            this.backgroundFar.img,
            this.backgroundFar.x,
            this.backgroundFar.y,
            this.backgroundFar.width,
            this.backgroundFar.height
        )
            
        //Far bg 2° piece
        this.ctx.drawImage(
            this.backgroundFar.img,
            this.backgroundFar.x + this.backgroundFar.width,
            this.backgroundFar.y,
            this.backgroundFar.width,
            this.backgroundFar.height
        )

        //Front bg 1° piece

       // this.ctxGame.clearRect(0,0,this.ctxGame.canvas.width,this.ctxGame.canvas.heigth);
        this.ctxGame.drawImage(
            this.backgroundFront.img,
            this.backgroundFront.x,
            this.backgroundFront.y,
            this.backgroundFront.width,
            this.backgroundFront.height
            
            )
            
            //Front bg 2° piece
       //   this.ctxGame.clearRect(0,0,this.ctxGame.canvas.width,this.ctxGame.canvas.heigth);
       //const speedSign = this.player.speedX > 0 ? 1 : -1
        this.ctxGame.drawImage(
            this.backgroundFront.img,
            this.backgroundFront.x + this.backgroundFront.width,
            this.backgroundFront.y,
            this.backgroundFront.width,
            this.backgroundFront.height

        )
        
       this.ctxGame.fillStyle = "gray";
       this.ctxGame.fillRect(0,this.ctxGame.canvas.height-28, this.ctx.canvas.width, 200)
  }

}