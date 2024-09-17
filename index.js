let towers = [];
let enemies = [];
let projectiles = [];

let health = 100; // Start with 100 health
let money = 100; // Start with 100 coins
let score = 0; // Start with 0 score

let selectedTower = null;

// Define the enemy path
const path = [
    { x: 100, y: -50 },
    { x: 100, y: 500 },
    { x: 700, y: 500 },
    { x: 700, y: -50 }
];

// Update the displayed money count
function updateMoneyDisplay() {
    document.getElementById('moneyCount').textContent = `Coins: ${money}`;
}

// Update the displayed health count
function updateHealthDisplay() {
    document.getElementById('healthCount').textContent = `Health: ${health}`;
}

// Update the displayed score count
function updateScoreDisplay() {
    document.getElementById('scoreCount').textContent = `Score: ${score}`;
}

// Update the displayed final score count
function updateFinalScoreDisplay() {
    document.getElementById('finalScore').textContent = `${score}`;
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

// Event listener to the tower selection box
document.querySelector('.standard-tower').addEventListener('click', () => {
    selectedTower = 'standard'; // Set selectedTower to 'standard' when clicked
    document.querySelector('.standard-tower').classList.add('selected');
    noTowerSelected.style.display = 'none';
});

// Start the game
function startGame() {

    // Initial money display update
    updateMoneyDisplay();
    updateHealthDisplay();
    updateScoreDisplay();
    updateFinalScoreDisplay();

    // Spawn an enemy every 2 seconds
    setInterval(() => {
        enemies.push(new Enemy(path));
    }, 2000);

// Canvas click event for placing towers
canvas.addEventListener('click', (event) => {
    if (!selectedTower) {
        noTowerSelected.style.display = 'block';
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const gridX = Math.floor(x / gridSize) * gridSize;
    const gridY = Math.floor(y / gridSize) * gridSize;

    // Check if the player has enough money to build a tower
    if (money >= 10) {
        // Place the selected tower
        towers.push(new Tower(gridX, gridY));

        // Reduce money by the cost of the tower
        money -= 10;
        updateMoneyDisplay();
    } else {
        noMoney.style.display = 'block';
    }
});

    // Start the game loop
    gameLoop();
}

function gameOver() {
    gameSection.style.display = 'none';
    gameOverSection.style.display =  'block';
    updateFinalScoreDisplay();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (health <= 0) {
        gameOver();
        return; // Stop the game loop
    }

    // Draw the path
    drawPath();

    // Draw and move enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.move();
        enemy.draw();

        if (enemy.health <= 0) {
            if (!enemy.reachedEnd) {
                score += 1;  // Increase score if the enemy was destroyed by a projectile
                updateScoreDisplay();  // Update the score display on the screen
            }
            enemies.splice(i, 1);  // Remove the enemy directly if health is 0
        }
    }

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




