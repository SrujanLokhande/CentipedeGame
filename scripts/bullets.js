/* <!-- Copyright (C) 2023 Srujan Lokhande --> */
// Bullet Object Definition
function Bullet(x, y, speed, size) {
        
    // Bullet Properties
    this.x = x
    this.y = y
    this.speed = speed
    this.size = size


    // bullet Methods

    this.show = function() {
        noStroke()
        fill(176,176,176)                                   // color of the bullets
        ellipse(this.x, this.y, this.size, this.size)       // size of the bullets

    }

    this.move = function() {                                // move the bullets up the canvas
        this.y -= this.speed
    }

    this.update = function() {
        this.move()
        this.show()
    }
}

// CurrentBullet Object Definition
function CurrentBullets(){

    // CurrentBullet Properties
    this.fired = []                                         // contains all the bullets fired

    // CurrentBullets Methods
    this.checkExpired = function() {                        // function to delete the bullets after they go out of the screen
        for (let b = 0; b < this.fired.length; b++) {
            if(this.fired[b]. y <0) {   
                this.fired.splice(b, 1)                     // splice function inbuilt in p5.js deletes the object
            }
        }
    }

    this.update = function() {
        this.checkExpired()                                 // checks if the bullets leave the canvas
        for (let b = 0; b < this.fired.length; b++){        // updates the bullets
            this.fired[b].update()
        }
    }

    this.shoot = function(x, y) {
        let b = new Bullet(x, y, 5, 5)          // Spawns the bullet with the size and speed
        this.fired.push(b)
        bulletDelay = RESETDELAY                // anytime a bullet is added to a array it resets the delay
    }

    this.checkCollide = function() {            // function to remove the node as well as bulet when they collide
        let bulletsToRemove = []
        let nodesToRemove = []
        let mushroomToRemove = []        
        
        for (let b = 0; b < this.fired.length; b++){
            for ( let c = 0; c < centipede.body.length; c++) {
                let d = dist(this.fired[b].x, this.fired[b].y, centipede.body[c].x, centipede.body[c].y)       // calculates the distance between the centipede nodes and bullet

                if (d < this.fired[b].size/2 + centipede.body[c].size/2) {                                  // if distance is less than the size/2 collision has occured

                    bulletsToRemove.push(b) 
                    nodesToRemove.push(c)                                                    
                    gameScore++                    
                }
            }
            for (let m = 0; m < mushrooms.length; m++) {                                            // shoots the mushrooms
                let k = dist(this.fired[b].x, this.fired[b].y, mushrooms[m].x, mushrooms[m].y)      // calculates the distance between the bullet and the mushroom

                if (k < this.fired[b].size/2 + mushrooms[m].size/2) {                               // if collision is there then remove the bullet and mushroom
                    bulletsToRemove.push(b)
                    mushroomToRemove.push(m)
                    gameScore++          
                    
                }
            }
        }

        for (let b = 0; b < bulletsToRemove.length; b++) {
            this.fired.splice(bulletsToRemove[b], 1)                            // removes the collided bullet
            bulletDelay = -1                                                    // makes the shooter shoot two bullets one collided with the centipede
        }

        for (let c = 0; c < nodesToRemove.length; c++) {                             // if two bullets collide with at the same time 
            centipede.body.splice(nodesToRemove[c], 1)                             // removes the collided node                                                    
        }
        
        for (let m = 0; m < mushroomToRemove.length; m++) {
            mushrooms.splice(mushroomToRemove[m], 1)                            // remove the mushroom which is hit bu bullet
        }   


    }

}