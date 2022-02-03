class Game {
    constructor(ctx, background, obstacles, player, enemies, rewards, ctxGame) {
        this.ctx = ctx;
        this.background = background;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.player = player;
        this.rewards = rewards;
        this.ctxGame = ctxGame;
        this.frameNumber = null;
        this.coinsValue = 10;
        this.score = 0;
        this.lifes = 5;
        this.gameOver = false;
    }

    start() {
        this.init();
        this.player.generateSpritesArrays()
        this.enemies.generateEnemiesArray();
        this.rewards.generateRewardsArray();
        this.play();
    }

    init() {
        this.frameNumber = null;
        //this.sound.stop()...
        //background.init()
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

    }

    play() {
        this.frameNumber += 1;
        this.updateScore();
        this.move();
        this.checkGameOver();
        if (this.frameNumber % 100 === 0) this.obstacles.newObs(
            this.ctxGame.canvas.width + Math.random() * 500,
            100 + Math.random() * 400,
            50 + Math.random() * 300);
        this.rewards.setRewards();
        this.increaseSpeed();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctxGame.clearRect(0, 0, this.ctxGame.canvas.width, this.ctxGame.canvas.height)
        this.draw();
        this.enemies.randomFireball(this.frameNumber);
        requestAnimationFrame(this.play.bind(this))
    }

    move() {
        this.background.move(this.frameNumber);
        this.player.move(this.frameNumber);
        this.obstacles.move(this.frameNumber)
        this.enemies.move(this.frameNumber);
        this.player.checkContact(this.obstacles.obstacles);
        this.rewards.move(this.frameNumber)
    }

    draw() {
        this.background.draw(this.frameNumber);
        this.obstacles.draw(this.frameNumber)
        this.enemies.draw();
        this.player.draw(this.frameNumber);
        this.rewards.draw();
        this.drawScore();
    }

    checkGameOver() {
        if ((this.player.x < -this.player.width || this.lifes === 0) && !this.gameOver) {
            document.getElementById("game-over-screen").classList.toggle("hidden");
           // document.getElementById("game-general").classList.toggle("hidden");
            document.querySelector(".game-container").classList.toggle("hidden");
            this.gameOver = true;
        }
    }

    updateScore() {
        this.score = this.rewards.takenCoins;
        this.lifes = this.enemies.playerLifes;
    }

    drawScore() {
        this.ctxGame.font = "15px Comic Sans MS";
        this.ctxGame.fillText(`Score: ${this.score}  Lifes: ${this.lifes}`, 50, 50)
    }

    restart(){
        this.gameOver = false;
        this.player.x = this.ctxGame.width/2;
        this.player.y = 0;
        this.enemies.playerLifes = 5;
        this.rewards.takenCoins = 0;
    }

    increaseSpeed(){
        if(this.frameNumber % 500 === 0) this.player.moveSpeed +=0.5;
    }

}