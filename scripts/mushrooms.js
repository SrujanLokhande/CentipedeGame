/* <!-- Copyright (C) 2023 Srujan Lokhande --> */
// Mushroom Object Definition
function Mushroom(x, y, size, c) {

    // Mushroom Properties
    this.x = x
    this.y = y
    this.size = size
    this.c = c   


    // Mushroom Methods
    this.show = function() {
        strokeWeight (2)
        stroke(200, 200, 195)
        fill(20 + this.c, 20 + this.c, 20 + this.c)
        ellipse(this.x, this.y, this.size, this.size)
        rect(this.x - this.size/3, this.y + this.size/2 -5, 2 * this.size/3, 7)
    }    
   
}