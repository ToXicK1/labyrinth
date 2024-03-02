document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const snake = document.getElementById("snake");
    const apple = document.getElementById("apple");
    const scoreElement = document.getElementById("score");

    let snakeX = 0;
    let snakeY = 0;
    let snakeSize = 1;
    let direction = "right";
    let appleX, appleY;
    let score = 0;

    function updateScore() {
        scoreElement.innerText = "Score: " + score;
    }

    function placeApple() {
        appleX = Math.floor(Math.random() * 15) * 20;
        appleY = Math.floor(Math.random() * 15) * 20;
        apple.style.left = appleX + "px";
        apple.style.top = appleY + "px";
    }

    function moveSnake() {
        let newSegment = document.createElement("div");
        newSegment.className = "snake-segment";
    
        if (direction === "right") snakeX += 20;
        else if (direction === "left") snakeX -= 20;
        else if (direction === "up") snakeY -= 20;
        else if (direction === "down") snakeY += 20;
    
        if (snakeX < 0 || snakeX >= 500 || snakeY < 0 || snakeY >= 500) {
            alert("Game Over! Your score is: " + score);
            resetGame();
            return;
        }
    
        newSegment.style.left = snakeX + "px";
        newSegment.style.top = snakeY + "px";
    
        gameContainer.appendChild(newSegment);
    
        if (snakeX === appleX && snakeY === appleY) {
            score++;
            updateScore();
            placeApple();
        } else {
            // Remove the first snake segment if not eating an apple
            let segments = document.getElementsByClassName("snake-segment");
            if (segments.length > snakeSize) {
                gameContainer.removeChild(segments[0]);
            }
        }
    }
    function resetGame() {
        // Remove all existing snake segments
        let segments = document.getElementsByClassName("snake-segment");
        while (segments.length > 0) {
            gameContainer.removeChild(segments[0]);
        }
    
        snakeX = 0;
        snakeY = 0;
        snakeSize = 1;
        direction = "right";
        score = 0;
        updateScore();
        placeApple();
    }
    

    function handleKeyPress(event) {
        const key = event.key;
        if ((key === "ArrowRight" && direction !== "left") ||
            (key === "ArrowLeft" && direction !== "right") ||
            (key === "ArrowUp" && direction !== "down") ||
            (key === "ArrowDown" && direction !== "up")) {
            direction = key.toLowerCase().replace("arrow", "");
        }
    }

    document.addEventListener("keydown", handleKeyPress);

    resetGame();
    setInterval(moveSnake, 80);
});
