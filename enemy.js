class Enemy {
    constructor(path) {
        this.size = 40;
        this.speed = 3;
        this.path = path;
        this.pathIndex = 0;
        this.reachedEnd = false;

        // Adjust the initial position to the center of the path
        this.x = path[0].x - 25;
        this.y = path[0].y - 25;
        this.health = 100;

        // Initialize the image and set fallback properties
        this.image = new Image();
        this.image.src = 'Assets/Images/Enemy.png';  // Path to your image
        this.imageLoaded = false;

        // Handle image load and error
        this.image.onload = () => this.imageLoaded = true;
        this.image.onerror = () => {
            console.error('Failed to load image, falling back to default.');
            this.imageLoaded = false;
        };
    }

    draw() {
        if (this.imageLoaded) {
            // Draw the image if it has loaded
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // Draw the fallback red square
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    move() {
        if (this.reachedEnd) return; // Prevent further movement if the enemy has reached the end
    
        let target = this.path[this.pathIndex];
        let dx = target.x - (this.x + 25);  // Adjust for center alignment
        let dy = target.y - (this.y + 25);  // Adjust for center alignment
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.speed) {
            this.pathIndex++;
            if (this.pathIndex >= this.path.length) {
                // Enemy reached the end of the path
                this.reachEnd();  // Handle reaching the end
                return;
            }
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }    

    reachEnd() {
        // Reduce the player's health by 10
        if (health > 0) {
            health += 10;
        }
        updateHealthDisplay();  // Update the health display on the screen
    
        // Mark the enemy as having reached the end
        this.reachedEnd = true;
        this.health = 0;
    }    
}
