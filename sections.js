const openingSection = document.querySelector('.opening-section');
const gameSection = document.querySelector('.game-section');

window.onload = () => {
    const startButton = document.getElementById('start-button');
    startButton.onclick = () => { 
        gameSection.style.display = 'block'; // Make the game section visible
        openingSection.style.display = 'none'; // Hide the opening section
    };
};
