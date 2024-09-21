class Projectile {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage; // Add damage property
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        let dx = this.target.x + this.target.size / 2 - this.x;
        let dy = this.target.y + this.target.size / 2 - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.target.health -= this.damage; // Apply the projectile's damage
            return true; // Destroy the projectile
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
            return false; // Projectile continues moving
        }
    }
}
