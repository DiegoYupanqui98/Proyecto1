class Rewards {
    constructor(ctx, obstacles, player) {
        this.ctx = ctx;
        this.obstacles = obstacles;
        this.player = player;
        this.rewardsImg = []
        this.coinWidth = 30;
        this.coinHeight = 30;
        this.coinsArray = [];
        this.spriteSpeed = 10;
        this.takenCoins = 0;
    }

    generateRewardsArray() {
        for (let i = 0; i < 11; i++) {
            const img = new Image();
            img.src = `./rewards/Recurso ${i + 1}.png`;
            img.onload = () => this.rewardsImg.push(img);
        }
    }

    move(framenumber) {
        if(this.speedX != 0){
            this.coinsArray.forEach(coin => {
                coin.x = coin.obj.x + coin.obj.width / 2 - this.coinWidth / 2;
                if (framenumber % this.spriteSpeed === 0)
                this.changeToNextImage(coin, this.rewardsImg)
            })}
            this.checkCoinsCollision()
            //console.log(this.player.speedX)
    }

    draw() {
        this.coinsArray.forEach(coin => {
            if(!coin.taken)
            this.ctx.drawImage(coin.img, coin.x, coin.y, this.coinWidth, this.coinHeight)
           // this.ctx.strokeRect(coin.x,coin.y,this.coinWidth,this.coinHeight)
        })
    }

    setRewards() {
        this.obstacles.obstacles.forEach(obj => {
            // console.log("coined: ", obj.coined)
            if (!obj.coined && this.obstacles.obstacles.indexOf(obj) % 2 === 0) {
                const newCoin = {};
                newCoin.x = obj.x + obj.width / 2 - this.coinWidth / 2;
                newCoin.y = this.ctx.canvas.height - 28 - obj.height - this.coinHeight * 1.5;
                newCoin.img = this.rewardsImg[0];
                newCoin.taken = false;
                newCoin.obj = obj;
                this.coinsArray.push(newCoin);
                obj.coined = true;
            }
        })
    }

    changeToNextImage(obj, array) {
        let actualIndex = array.indexOf(obj.img);
        if (actualIndex === array.length - 1) actualIndex = -1;
        obj.img = array[actualIndex + 1];
    }


    checkCoinsCollision(){
        this.coinsArray.forEach(coin =>{
            console.log(this.player.x, this.player.y, coin.x, coin.y)
            if(
                //this.player.x > coin.x
                this.player.x < coin.x + 50 &&
                this.player.x + this.player.width > coin.x &&
                this.player.y < coin.y + 50 &&
                this.player.y + this.player.height > coin.y
            ){
                this.coinsArray.splice(this.coinsArray.indexOf(coin),1)
                this.takenCoins++;
            }
        })
    }
}