const gridSize = 50;

// Load the tower image
const towerImage = new Image();
towerImage.src = 'Assets/Images/Basic-Tower.png';

class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 100;
        this.fireRate = 30;
        this.fireCooldown = 0;
    }

    draw() {
        // Draw the tower image
        ctx.drawImage(towerImage, this.x, this.y, gridSize, gridSize);
    }

    shoot() {
        if (this.fireCooldown === 0) {
            let target = this.getTarget();
            if (target) {
                projectiles.push(new Projectile(this.x + gridSize / 2, this.y + gridSize / 2, target));
                this.fireCooldown = this.fireRate;
            }
        } else {
            this.fireCooldown--;
        }
    }

    getTarget() {
        return enemies.find(enemy => {
            const dx = (enemy.x + enemy.size / 2) - (this.x + gridSize / 2);
            const dy = (enemy.y + enemy.size / 2) - (this.y + gridSize / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.range;
        });
    }
}
