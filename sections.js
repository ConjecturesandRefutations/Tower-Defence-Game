const openingSection = document.querySelector('.opening-section')
const gameSection = document.querySelector('.game-section');
const gameOverSection = document.querySelector('.game-over');
const noTowerSelected = document.querySelector('.no-tower-selected');
const noMoney = document.querySelector('.no-money');

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
    };
};

