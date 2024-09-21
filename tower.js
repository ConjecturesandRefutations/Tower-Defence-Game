const gridSize = 50;

// Load the tower images globally
const towerImages = {
    mud: new Image(),
    medieval: new Image(),
};

towerImages.mud.src = 'Assets/Images/Mud-Tower.png';
towerImages.medieval.src = 'Assets/Images/Medieval-Tower.png';

let towerImagesLoaded = {
    mud: false,
    medieval: false,
};

// Set flags when the images have loaded
towerImages.mud.onload = () => {
    towerImagesLoaded.mud = true;
};
towerImages.medieval.onload = () => {
    towerImagesLoaded.medieval = true;
};

class Tower {
    constructor(x, y, type = 'mud') { // Default to 'mud' tower
        this.x = x;
        this.y = y;
        this.type = type;
        this.range = 100;

        // Set fire rate and damage based on the tower type
        if (this.type === 'mud') {
            this.fireRate = 30;
            this.projectileDamage = 50; // Damage for mud tower
        } else if (this.type === 'medieval') {
            this.fireRate = 60;
            this.projectileDamage = 100; // Damage for medieval tower
        }
        
        this.fireCooldown = 0;

        // Load the appropriate image and aspect ratio
        this.image = towerImages[this.type];
        this.imageLoaded = towerImagesLoaded[this.type];

        // Default size
        this.width = gridSize;
        this.height = gridSize;

        if (this.imageLoaded) {
            const aspectRatio = this.image.width / this.image.height;
            this.height = gridSize / aspectRatio; // Adjust height based on aspect ratio
        }
    }

    draw() {
        // Only draw the tower if the image has fully loaded
        if (towerImagesLoaded[this.type]) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    shoot() {
        if (this.fireCooldown === 0) {
            let target = this.getTarget();
            if (target) {
                projectiles.push(new Projectile(
                    this.x + this.width / 2, 
                    this.y + this.height / 2, 
                    target, 
                    this.projectileDamage // Pass the appropriate damage
                ));
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

// Function to choose tower type (can be attached to UI or input)
function createTower(x, y, type) {
    return new Tower(x, y, type);
}
