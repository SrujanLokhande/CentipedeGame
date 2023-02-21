/* <!-- Copyright (C) 2023 Srujan Lokhande --> */
// Game constants
const PLAYINGGAME = 2                   // different game scenes
const GAMEOVER = 3                      // game over scene i.e. if the player lives are over
const CENTIPEDESTARTLENGTH = 10         // the number of circles in the centipede
const CENTIPEDESIZE = 20                // changes the centipede size
const RESETDELAY = 20                   // number of cycle before the player can shoot another bullet
const MAXLIVES = 3                      // max number of lives a player can have


// Global Variables
let gameWidth = window.innerWidth - 20          // decrease this number for decreasing width
let gameHeight = window.innerHeight - 20       // decrease this number for decreasing top height
let cnv                                        // Game Canvas
let player                                    // Little Shooter
let centipede                                 // centipede variable
let bullets                                   // bullet variable
let keys = []                                 // Key Pressed Events which are default in p5.js
let currentScene = PLAYINGGAME                // different game scenes variable
let levelSpeed = 1                            // changes the speed of the centipede travelling
let level = 1                                 // kepps the track of levels
let bulletDelay = RESETDELAY                  // counter to know which shooting cycle it is
let gameScore = 0                             // game score variable
let mushrooms = []                            // mushrooms array
TotalMushroom = 20                            // max number of mushroom on canvas

// p5 Canvas Setup
function setup()
{
    if(gameWidth > 700)
    {
        gameWidth = 700
    }   
    
    cnv = createCanvas(gameWidth, gameHeight)
    centerCanvas()
    textAlign(CENTER, CENTER)
    textSize(20)
    noCursor()                          // blocks the mouse cursor

    player = new Player(width/2, 0.75 * height, 30, 2)                                  // player instance 
    centipede = new Centipede(CENTIPEDESTARTLENGTH, CENTIPEDESIZE, levelSpeed)        // centipede instance
    bullets = new CurrentBullets()                                                    // instance of bullet object
    spawnMushrooms()
}

function centerCanvas()                 // the main canvas where the game runs
{
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) /2
    cnv.position(x,y)
}

function spawnMushrooms() {                                         // spawns the mushrooms on random location in the canvas
    mushrooms = []    

    for (let m = 0; m < TotalMushroom; m++) {                                          // spawns 20 mushrooms
        let x = random(CENTIPEDESIZE/2, width - CENTIPEDESIZE/2)
        let y = random(4 * CENTIPEDESIZE, height - 4 * CENTIPEDESIZE)

        // mushroom to not spawn on the player
        while(dist(x, y, player.x, player.y) < player.size/2 + CENTIPEDESIZE/2){
            x = random(CENTIPEDESIZE/2, width - CENTIPEDESIZE/2)
            y = random(4 * CENTIPEDESIZE, height - 4 * CENTIPEDESIZE)
        }
        
        for (let l = 0; l < level; l++) {                           // put the mushrooms on top of each other so that it takes more bullets to die
            let c = l * 45
            c = constrain(c, 0, 205)
            mushrooms.push(new Mushroom(x, y, CENTIPEDESIZE, c))
        }
    }

}
function showMushrooms() {                                   // to show the mushroom
    for (let m = 0; m < mushrooms.length; m++) {
        mushrooms[m].show()
    }
}

// Scene Definitions
function gamePlayingScene() {       // The scene where the player starts the game
    
    background(0,0,0)

    // if regenrates the centipede if the centipede dies
    if(centipede.body.length < 1) {
        level++
        spawnMushrooms()
        levelSpeed = (level/4) + 1                // centipede speed on new level
        centipede.regenerate(levelSpeed)
    }

    centipede.update()          // centipede spawning
    bullets.update()            // bullet spawning and updating
    player.update()             // character spawning
    showMushrooms()    // shows the mushrooms on the canvas
    
    bulletDelay--               // subtract the cycle count of the bullet
    
    player.checkCollide()      // checks the collision of the player with the centipede
    if(player.lives < 1) {
        currentScene = GAMEOVER         // if lives are less than 1 then show the game over scene
    }
    
    bullets.checkCollide()   


    // Display stats at the top of the canvas
    fill(255,70,250)
    noStroke()
    textSize(BOLD)
    text("SCORE: " + gameScore + "                  LEVEL: "+ level + "                      LIVES: " + player.lives, width/2, 20)
}

// Game over scene
function gameOverScene() {
    background(255,175,0)
    textSize(40)
    text("GAME OVER", width/2, height/3)
    text("Score: " + gameScore, width/2, 2 * height/3)
}

// Animation Loop

function draw(){                                // different scenes which can be changed by changing the constants because of global variables and switch
    switch(currentScene) {
        case PLAYINGGAME:
            gamePlayingScene()
            break;
        case GAMEOVER:
            gameOverScene()
            break;

    }
    
}

// Keyboard Event Handlers
function keyPressed(){

    keys[keyCode] = true        // on key pressed events default in p5.j
}

function keyReleased(){

    keys[keyCode] = false       // on key released events default in p5.j
}