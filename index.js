//Key Variables

let gameInterval; 

let towers = [];
let enemies = [];
let projectiles = [];

let health = 100; // Start with 100 health
let money = 100; // Start with 100 coins
let score = 0; // Start with 0 score

let selectedTower = null;

let cursorX = 0;
let cursorY = 0;
let isPlacingTower = false; // Check if the player is placing a tower
let towerImage = new Image(); // Image for the selected tower

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

    
// Function to test if a point (x, y) is inside a polygon
function isPointInPolygon(polygon, x, y) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Helper function to generate polygon points around the path
function generatePathPolygon(path, width) {
    const halfWidth = width / 2;
    const polygon = [];

    for (let i = 1; i < path.length; i++) {
        const start = path[i - 1];
        const end = path[i];
        
        // Calculate perpendicular vectors
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (dy / len) * halfWidth;
        const offsetY = -(dx / len) * halfWidth;

        // Add points to the polygon
        polygon.push({ x: start.x + offsetX, y: start.y + offsetY });
        polygon.push({ x: end.x + offsetX, y: end.y + offsetY });
    }

    // Close the polygon by adding reverse offset points
    for (let i = path.length - 1; i > 0; i--) {
        const start = path[i - 1];
        const end = path[i];
        
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const offsetX = -(dy / len) * halfWidth;
        const offsetY = (dx / len) * halfWidth;

        polygon.push({ x: end.x + offsetX, y: end.y + offsetY });
        polygon.push({ x: start.x + offsetX, y: start.y + offsetY });
    }

    return polygon;
}

// Adjust the isTowerOnPath to check against the generated path polygon
function isTowerOnPath(towerX, towerY, towerWidth, towerHeight) {
    const towerCenterX = towerX + towerWidth / 2;
    const towerCenterY = towerY + towerHeight / 2;
    
    // Generate the path polygon
    const pathPolygon = generatePathPolygon(path, 50); // 50 is the path width
    
    // Check if the tower's center is inside the path polygon
    return isPointInPolygon(pathPolygon, towerCenterX, towerCenterY);
}

canvas.addEventListener('click', (event) => {
    if (!selectedTower) {
        noTowerSelected.style.display = 'block';
        setTimeout(() => {
            noTowerSelected.style.display = 'none';
        }, 3000);
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Use the exact cursor position without snapping to grid
    const towerX = cursorX - (selectedTower === 'medieval' ? 25 : 26);
    const towerY = cursorY - (selectedTower === 'medieval' ? 47.5 : 32.5);    
    
    // Define tower dimensions based on the type
    const towerWidth = selectedTower === 'medieval' ? 50 : 52;
    const towerHeight = selectedTower === 'medieval' ? 95 : 65;

    let towerCost = selectedTower === 'medieval' ? 20 : 10;

    // Check if the tower is on the path
    if (isTowerOnPath(towerX, towerY, towerWidth, towerHeight)) {
        towerOnPath.style.display = 'block';
        setTimeout(() => {
            towerOnPath.style.display = 'none';
        }, 3000);
        return; // Prevent tower placement
    }

    if (money >= towerCost) {
        towers.push(new Tower(towerX, towerY, selectedTower));  // Use towerX and towerY directly for placement
        money -= towerCost;
        updateMoneyDisplay();
        isPlacingTower = false;  // Stop showing the tower after placing
        selectedTower = null;
    } else {
        noMoney.style.display = 'block';
        setTimeout(() => {
            noMoney.style.display = 'none';
        }, 3000);
    }
});
    
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;

    if (selectedTower) {
        isPlacingTower = true;
        towerImage.src = selectedTower === 'medieval' ? 'Assets/Images/Medieval-Tower.png' : 'Assets/Images/Mud-Tower.png';
    } else {
        isPlacingTower = false;
    }
    
    // Check if the tower is hovering over the path
    const towerX = cursorX - (selectedTower === 'medieval' ? 25 : 26);
    const towerY = cursorY - (selectedTower === 'medieval' ? 47.5 : 32.5);
    const towerWidth = selectedTower === 'medieval' ? 50 : 52;
    const towerHeight = selectedTower === 'medieval' ? 95 : 65;

    // Set a flag if the tower is hovering over the path
    if (isTowerOnPath(towerX, towerY, towerWidth, towerHeight)) {
        ctx.isTowerOverPath = true;  // Custom flag for drawing the tower red
    } else {
        ctx.isTowerOverPath = false; // Default state
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
        return;
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
                score += 1;
                updateScoreDisplay();
            }
            enemies.splice(i, 1);
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

    // Draw the selected tower following the cursor with color change based on path hover
    if (isPlacingTower) {
        // Set transparency for washed-out effect
        ctx.globalAlpha = 0.5;
    
        // Use the dimensions based on the selected tower type
        const towerWidth = selectedTower === 'medieval' ? 50 : 52;
        const towerHeight = selectedTower === 'medieval' ? 95 : 65;
    
        // Check if the tower is over the path and set the color accordingly
        if (ctx.isTowerOverPath) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red with transparency
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Default washed-out white
        }

        // Draw the tower image following the cursor
        ctx.fillRect(cursorX - (towerWidth / 2), cursorY - (towerHeight / 2), towerWidth, towerHeight);
        ctx.drawImage(towerImage, cursorX - (towerWidth / 2), cursorY - (towerHeight / 2), towerWidth, towerHeight);
    
        // Reset transparency and fill color
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    // Clear the game state
    towers = [];
    enemies = [];
    projectiles = [];

    // Reset game variables
    health = 100;
    money = 100;
    score = 0;

    // Update UI elements
    updateMoneyDisplay();
    updateHealthDisplay();
    updateScoreDisplay();

    // Clear any existing enemy spawn intervals
    clearInterval(gameInterval);

    // Clear canvas if needed
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}