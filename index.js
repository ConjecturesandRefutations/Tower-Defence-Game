let towers = [];
let enemies = [];
let projectiles = [];

// Define the enemy path
const path = [
    { x: 100, y: 50 },
    { x: 100, y: 500 },
    { x: 700, y: 500 },
    { x: 700, y: 50 }
];

// Spawn an enemy every 2 seconds
setInterval(() => {
    enemies.push(new Enemy(path));
}, 2000);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const gridX = Math.floor(x / gridSize) * gridSize;
    const gridY = Math.floor(y / gridSize) * gridSize;

    towers.push(new Tower(gridX, gridY));
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and move enemies
    enemies = enemies.filter(enemy => enemy.health > 0);
    enemies.forEach(enemy => {
        enemy.move();
        enemy.draw();
    });

    // Draw and shoot with towers
    towers.forEach(tower => {
        tower.draw();
        tower.shoot();
    });

    // Draw and move projectiles
    projectiles = projectiles.filter(projectile => !projectile.move());
    projectiles.forEach(projectile => projectile.draw());

    requestAnimationFrame(gameLoop);
}

gameLoop();
