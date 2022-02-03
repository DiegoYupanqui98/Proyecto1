class Obstacles{
    constructor(ctx,player){
        this.ctx = ctx;
        this.obstacles = [];
        this.player = player;
        this.colors = ["#5B5B5B", "#1F1F1F", "#2C2E61"]
    }
    
    newObs(x,width,height){
        const newObstacle = {x:x, width : width, height:height, color: this.colors[Math.floor(Math.random()*3)], coined : false}
        this.obstacles.push(newObstacle);
    }
    
    move(){
        this.obstacles.forEach(obj => obj.x-=this.player.speedX)
    }
    
    draw(){
        this.obstacles.forEach(obj =>{
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(obj.x,this.ctx.canvas.height-28-obj.height,obj.width,obj.height);
        })
    }
}

