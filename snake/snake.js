let snake = [];
let direction = 0;
let food = [110, 110];

let bodySize = Math.floor(Math.min(window.innerWidth, window.innerHeight - 250) / 20);
let width = bodySize * 20 - bodySize;
let height = bodySize * 20 - bodySize;
let score = 0;
let canTurn = true;

function setup() {
    score = 0;
    document.getElementById("head").innerHTML = "Score: 0";
    document.getElementById("info").innerHTML = null;
    var canvas = createCanvas(width, height);
    canvas.parent("canvas");
    frameRate(10);

    snake = [];

    for (let i = 0; i < 3; i++) {
        snake.push([width / 2, height / 2]);
    }

    generateFood();
}

function draw() {
    canTurn = true;
    background(0, 150, 0);

    //Draw snake
    let p = 255;

    for (let i = 0; i < snake.length; i++) {
        fill(p);
        p -= 10;
        circle(snake[i][0], snake[i][1], bodySize);
    }

    if (snake[0][0] == food[0] && snake[0][1] == food[1]) {
        eat();
    }

    moveBody();
    moveHead();
    detectCrash();

    //Draw food
    fill(255, 0, 0);
    circle(food[0], food[1], bodySize)
}

function moveHead() {
    if (direction == 0) {
        snake[0][0] -= bodySize;
    } else if (direction == 1) {
        snake[0][0] += bodySize;
    } else if (direction == 2) {
        snake[0][1] -= bodySize;
    } else if (direction == 3) {
        snake[0][1] += bodySize;
    }
}

function moveBody() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i][0] = snake[i - 1][0];
        snake[i][1] = snake[i - 1][1];
    }
}

function detectCrash() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1]) {
            gameOver();
            return;
        }
    }

    if (snake[0][0] < 0) {
        snake[0][0] = width - bodySize / 2;
    } else if (snake[0][0] > width) {
        snake[0][0] = bodySize / 2;
    } else if (snake[0][1] < 0) {
        snake[0][1] = height - bodySize / 2;
    } else if (snake[0][1] > height) {
        snake[0][1] = bodySize / 2;
    }
}

function keyPressed() {
    if (!canTurn && keyCode != 32) {
        return;
    }
    canTurn = false;

    if (keyCode == LEFT_ARROW && direction != 1) {
        direction = 0;
    } else if (keyCode == RIGHT_ARROW && direction != 0) {
        direction = 1;
    } else if (keyCode == UP_ARROW && direction != 3) {
        direction = 2;
    } else if (keyCode == DOWN_ARROW && direction != 2) {
        direction = 3;
    } else if (keyCode == 32) {
        setup();
    }
}

function touchStarted() {
    if(mouseX > width / 2) {
        if(direction == 0) {
            direction = 2;
        } else if (direction == 1) {
            direction = 3;
        } else if (direction == 2){
            direction = 1;
        } else if(direction == 3) {
            direction = 0;
        }
    } else {
        if(direction == 0) {
            direction = 3;
        } else if (direction == 1) {
            direction = 2;
        } else if (direction == 2){
            direction = 0;
        } else if(direction == 3) {
            direction = 1;
        }
    }
}

function eat() {
    let bool = true;

    while (bool) {
        generateFood();
        bool = false;

        for (i in snake) {
            if (snake[i][0] == food[0] && snake[i][1] == food[1]) {
                bool = true;
            }
        }
    }

    score += 10;
    document.getElementById("head").innerHTML = "Score: " + score;
    snake.push([0, 0]);
}

function generateFood() {
    food[0] = Math.floor(Math.random() * Math.floor(width / bodySize)) * bodySize + bodySize / 2;
    food[1] = Math.floor(Math.random() * Math.floor(height / bodySize)) * bodySize + bodySize / 2;
}

function gameOver() {
    document.getElementById("head").innerHTML = "Game Over";
    document.getElementById("info").innerHTML = "Your score is: " + score + "! Press space to play again!";
    frameRate(0);
}