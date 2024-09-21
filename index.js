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
    { x: 300, y: 500 },
    { x: 1000, y: 500 },
    { x: 1200, y: 700 },
    { x: 1200, y: -50 }
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

// Event listener for the Mud Tower selection
document.querySelector('.mud-tower').addEventListener('click', () => {
    // Remove the 'selected' class from both towers
    document.querySelector('.mud-tower').classList.remove('selected');
    document.querySelector('.medieval-tower').classList.remove('selected');
    
    // Set selectedTower to 'mud' and add the 'selected' class to the mud tower
    selectedTower = 'mud';
    document.querySelector('.mud-tower').classList.add('selected');
    noTowerSelected.style.display = 'none';
});

// Event listener for the Medieval Tower selection
document.querySelector('.medieval-tower').addEventListener('click', () => {
    // Remove the 'selected' class from both towers
    document.querySelector('.mud-tower').classList.remove('selected');
    document.querySelector('.medieval-tower').classList.remove('selected');
    
    // Set selectedTower to 'medieval' and add the 'selected' class to the medieval tower
    selectedTower = 'medieval';
    document.querySelector('.medieval-tower').classList.add('selected');
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
    
        // Determine the cost based on the selected tower type
        let towerCost = selectedTower === 'medieval' ? 20 : 10;
    
        // Check if the player has enough money to build the selected tower
        if (money >= towerCost) {
            // Place the selected tower (Mud or Medieval based on selectedTower)
            towers.push(new Tower(gridX, gridY, selectedTower)); // Pass selectedTower as type
            // Reduce money by the cost of the tower
            money -= towerCost;
            updateMoneyDisplay();
        } else {
            noMoney.style.display = 'block';
            // Set timeout to hide the element after 3 seconds (3000ms)
            setTimeout(() => {
                noMoney.style.display = 'none';
            }, 3000);
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




