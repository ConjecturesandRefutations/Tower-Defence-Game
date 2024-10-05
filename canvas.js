const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas to match the container's size
const resizeCanvas = () => {
    // Store the current width and height for later use
    const prevWidth = canvas.width;
    const prevHeight = canvas.height;
    
    // Set the canvas width and height to match its container's size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Optional: You can scale your game elements based on the new size here
    rescaleGame(prevWidth, prevHeight, canvas.width, canvas.height);
};

// Call resizeCanvas initially to set the correct size
resizeCanvas();

// Optionally, resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Example function to handle game rescaling logic after canvas resize
function rescaleGame(prevWidth, prevHeight, newWidth, newHeight) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, newWidth, newHeight);

    // Redraw game objects here after rescaling if necessary
}
