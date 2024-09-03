let towers = [];
let enemies = [];
let projectiles = [];

let money = 100; // Start with 100 coins

// Define the enemy path
const path = [
    { x: 100, y: -50 },
    { x: 100, y: 500 },
    { x: 700, y: 500 },
    { x: 700, y: 0 }
];

// Update the displayed money count
function updateMoneyDisplay() {
    document.getElementById('moneyCount').textContent = `Coins: ${money}`;
}

// Draw the path in brown color
function drawPath() {
    ctx.strokeStyle = '#DA874C'; // Set the path color to brown
    ctx.lineWidth = 50; // Set the path line width

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
}

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

    // Check if the player has enough money to build a tower
    if (money >= 10) {
        towers.push(new Tower(gridX, gridY));
        money -= 10; // Reduce money by 10
        updateMoneyDisplay(); // Update the money display
    } else {
        alert('Not enough money to build a tower!');
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the path
    drawPath();

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

// Initial money display update
updateMoneyDisplay();

gameLoop();
