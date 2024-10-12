const openingSection = document.querySelector('.opening-section')
const gameSection = document.querySelector('.game-section');
const gameOverSection = document.querySelector('.game-over');
const noTowerSelected = document.querySelector('.no-tower-selected');
const noMoney = document.querySelector('.no-money');
const towerOnPath = document.querySelector('.tower-on-path');
const restartButton = document.querySelector('.restart'); 
const mainMenuButton = document.querySelector('.main-menu'); // Move this inside onload


window.onload = () => {
    const startButton = document.getElementById('start-button');
    
    startButton.onclick = () => { 
        gameSection.style.display = 'grid'; // Show the main content
        openingSection.style.display = 'none';

        // Force a repaint to make sure everything is visible
        setTimeout(() => {
            gameSection.offsetHeight; // Trigger a reflow
            resizeCanvas(); // Resize canvas to ensure it fits correctly
        }, 0);

        startGame(); // Start the game
    }};

    restartButton.onclick = () => {
    
        // Hide the game over section and show the game section
        gameSection.style.display = 'grid';
        gameOverSection.style.display = 'none';
    
        // Reset the game state
        resetGame();
    
        // Force a repaint and resize the canvas
        setTimeout(() => {
            gameSection.offsetHeight;
            resizeCanvas();
        }, 0);
    
        // Start the game again
        startGame();
    };
    
    mainMenuButton.onclick = () => {
    
        // Hide the game over section and show the game section
        gameSection.style.display = 'none';
        gameOverSection.style.display = 'none';
        openingSection.style.display = 'block';
    
        // Reset the game state
        resetGame();
    
    };