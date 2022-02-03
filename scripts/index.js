const canvas = document.getElementById("game-board")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = window.innerWidth * 0.9;
gameCanvas.height = window.innerHeight * 0.9;

const ctx = canvas.getContext("2d");
const ctxGame = gameCanvas.getContext("2d");

const player = new Player(ctxGame);
const background = new Background(ctx, ctxGame, player);
const obstacles = new Obstacles(ctxGame, player);
const enemies = new Enemies(ctxGame,player);
const rewards = new Rewards(ctxGame,obstacles,player)
const game = new Game(ctx, background, obstacles, player,enemies, rewards, ctxGame);

const mainAudio = new Audio("./images/audio.mp3")

const startBtn = document.getElementById("start-btn")
const startScreenContainer = document.querySelector(".start-screen-container");
const gameContainer = document.querySelector(".game-container.hidden")
const retryBtn = document.getElementById("retry-btn");

startBtn.addEventListener("click", () => {
    startScreenContainer.classList.add("slide-out");

    setTimeout(() => {
        startScreenContainer.classList.add("hidden");

    }, 1000);

    setTimeout(() => {
        gameContainer.classList.toggle("hidden")
        gameContainer.classList.toggle("show")
        mainAudio.play();
        player.grav = 0.5;
    }, 1000);

})

retryBtn.onclick = () => {
    location.reload();
    //game.restart();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.goUp();
            break;
        case 'ArrowRight':
            //player.onMove = true;
            if (!player.sideContact) {
                player.goRight()
                // player.keyDown = true;
               // player.speedX = 5;
                //console.log("Right");
            }
            break;
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.keyDown = false;
            break;

        case 'ArrowDown':
            console.log("down");

            break;

        case 'ArrowLeft':

            console.log("left");
            if (player.onGround) {
                player.onMove = false;
                player.keyDown = false;
            }

            break;
        case 'ArrowRight':
            if (player.onGround) {
                player.onMove = false;
                player.keyDown = false;
            }
            player.stopRight();
            console.log("Right");
            break;
    }
})
game.start();