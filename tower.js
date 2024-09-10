const gridSize = 50;

// Load the tower image globally
const towerImage = new Image();
towerImage.src = 'Assets/Images/Starting-Tower.png';
let towerImageLoaded = false;

// Set a global flag when the image has loaded
towerImage.onload = () => {
    towerImageLoaded = true;
};

class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 100;
        this.fireRate = 30;
        this.fireCooldown = 0;

        // Default to the grid size
        this.width = gridSize;
        this.height = gridSize;

        // Ensure the aspect ratio is preserved based on the image
        if (towerImageLoaded) {
            const aspectRatio = towerImage.width / towerImage.height;
            this.width = gridSize; // Use gridSize as the base width
            this.height = gridSize / aspectRatio; // Calculate height based on aspect ratio
        }
    }

    draw() {
        // Only draw the tower if the image has fully loaded
        if (towerImageLoaded) {
            ctx.drawImage(towerImage, this.x, this.y, this.width, this.height);
        }
    }

    shoot() {
        if (this.fireCooldown === 0) {
            let target = this.getTarget();
            if (target) {
                projectiles.push(new Projectile(this.x + this.width / 2, this.y + this.height / 2, target));
                this.fireCooldown = this.fireRate;
            }
        } else {
            this.fireCooldown--;
        }
    }

    getTarget() {
        return enemies.find(enemy => {
            const dx = (enemy.x + enemy.size / 2) - (this.x + this.width / 2);
            const dy = (enemy.y + enemy.size / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.range;
        });
    }
}
