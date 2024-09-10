const openingSection = document.querySelector('.opening-section');
const gameSection = document.querySelector('.game-section');
const gameOverSection = document.querySelector('.game-over');
const noTowerSelected = document.querySelector('.no-tower-selected');

window.onload = () => {
    const startButton = document.getElementById('start-button');
    startButton.onclick = () => { 
        gameSection.style.display = 'block'; // Make the game section visible
        openingSection.style.display = 'none'; // Hide the opening section
        startGame(); // Start the game
    };
};
