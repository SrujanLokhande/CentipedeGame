/* <!-- Copyright (C) 2023 Srujan Lokhande --> */
// Centipede Object Definition
function CentipedeNode(x, y, size, speed){

    // CentipedeNode properties
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed

    // Centipede Methods
    this.show = function() {
        strokeWeight(2)                                 // Weight of centipede
        stroke(255,255,0)                               // Outline Color of centipede
        fill(255,0,0)                                    // Fill color of the centipede    
        ellipse(this.x, this.y, this.size, this.size)  // the shape of the centipede     
    }

    this.move = function() {
        this.x += this.speed
        if(this.x < this.size/2 - 2 || this.x > width - this.size/2 + 2) {          // blocks the centipede to go out of the canvas
            this.drop()        
        }
    }

    this.drop = function() {                    // makes the centipede to move down when hits the end
        this.speed *= -1
        this.y += this.size + 3
        if(this.y > height - this.size) {     // makes the centipede to spawn at up again if it goes down to the screen
            this.y = this.size + 1
        }
    }
    this.checkCollide = function () {       // function to check collision with mushroom
        for (let c = 0; c < mushrooms.length; c++)
        {            
            let d = dist(this.x, this.y, mushrooms[c].x, mushrooms[c].y)
            if (d < this.size + mushrooms[c].size/2)
            {                
                mushrooms[c].color = color(255, 0, 0)
                this.speed *= -1
                this.y += this.size + 1
            }
        }
    }

    this.update = function() {
        this.move()                             // updates the screen to show or move the centipede
        this.show()
        this.checkCollide()
    }
}

// Centipede Object Definition
function Centipede(length, size, speed){

    //Centipede Properties
    this.size = size
    this.length = length
    this.speed = speed
    this.body = []

    // Centipede Methods

    // speed is not constant for each new chain of centipede which is the reason of making it a function parameter
    this.regenerate = function(speed) {              // to regenerate the centipede
        this.speed = speed
        this.body = []
        for(let c = 0; c< this.length; c++)
        {            
            // spawns the centipede chain on the screen with position
            this.body.push(new CentipedeNode(c * (this.size + 4) + this.size, 4 * this.size, this.size, this.speed))   
        }
    }

    this.update = function () {
        for (let c=0; c<this.body.length; c++) {        // updates the centipede chain
            this.body[c].update()                     // updates the centipede chain at each node            
        }
    }    

    this.regenerate(this.speed)             // to actually spawn the centipede

    
}

