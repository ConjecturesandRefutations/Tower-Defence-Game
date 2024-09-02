class Enemy {
    constructor(path) {
        this.size = 40;
        this.speed = 2;
        this.path = path;
        this.pathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
        this.health = 100;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
        let target = this.path[this.pathIndex];
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.pathIndex++;
            if (this.pathIndex >= this.path.length) {
                // Enemy reached the end of the path
                this.health = 0;
                return;
            }
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }
}
