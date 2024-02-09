/* <!-- Copyright (C) 2023 Srujan Lokhande --> */

// Player Object Definition

// Constructor
function Player(x, y, size, speed){


    // Player Properties
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed;
    this.lives = MAXLIVES


    // Player Methods
    

    // Function to move the Shooter
    // if statements because two keys can be pressed simultaneously to move diagonly
    this.move = function(){
        if(keys[LEFT_ARROW]) {
            this.x -= this.speed
        }
        
        if(keys[RIGHT_ARROW]) {
            this.x += this.speed
        }
        
        if(keys[UP_ARROW]) {
            this.y -= this.speed
        }

        if(keys[DOWN_ARROW]) {
            this.y += this.speed
        }        
        
        // blocks the player to go out of the playing area
        this.x = constrain(this.x, this.size/2, width - this.size/2)
        this.y = constrain(this.y, 600, height - this.size/2)
        
        if (keys[32] && bulletDelay < 0) {                                 // fires a bullet when the player hits spacebar
            bullets.shoot(this.x, this.y - this.size/2 - 5)
        }

    }

    // Show the Shooter
    this.show = function() {
        noStroke()                                          // doesnt shows the outline of the ellipse and rect differently
        fill(230, 45, 45)                                   // chanegs the color of the shooter
        rect(this.x - 2, this.y - this.size/2 - 5, 4, 6)    // changes the size of the rect above shooter     
        ellipse(this.x, this.y, this.size, this.size)       // changes the size of the shooter
    }

    // Check collision with the centipede
    this.checkCollide = function() {
        for (let c = 0; c < centipede.body.length; c++) {                               // checks the collision with each centipede 
            let d = dist(this.x, this.y, centipede.body[c].x, centipede.body[c].y)      // calculates the distance between the player and the centipede

            if(d < this.size/2 + centipede.body[c].size/2){                             // if colliding is true
                this.lives--
                this.y = height * 0.75                                                  // regenerate the shooter
                this.x = width/2

                centipede.regenerate(centipede.speed)                       // if the collidiing is true regenerate the centipede 
            }
        }
    }

    // updates the position of shooter 
    this.update = function() {
        this.move()
        this.show()
    }
}