class Cell {

    constructor(bomb) {
        this.bombCount = 0;
        this.cleared = false;
        this.flaged = false;
        this.bomb = bomb;
    }

    press(x, y) {
        if (!this.cleared) {
            this.cleared = true;
            clearedCells++;

            if (this.bomb) {
                gameOver = true;
                document.getElementById("head").innerHTML = "Game Over!";
                return;
            }

            checkNeighbours(x, y);

            if (clearedCells + totalBombs == gridSize ** 2) {
                document.getElementById("head").innerHTML = "You Won!";
            }

            if (this.bombCount == 0) {
                for (var i = y - 1; i <= y + 1; i++) {
                    for (var j = x - 1; j <= x + 1; j++) {
                        if (j >= 0 && j < gridSize && i >= 0 && i < gridSize && !grid[x][y].bomb) {
                            grid[j][i].press(j, i);
                        }
                    }
                }
            }
        }
    }
}

let gameOver = false;
let bombImg = null;
let flagImg = null;
let totalBombs = 0;
let clearedCells = 0;
let cellSize = 40;
let gridSize = 16;
let width = cellSize * gridSize;
let height = cellSize * gridSize;
let grid = [];
let color = [[0, 0, 255], [0, 150, 0], [255, 0, 0], [0,0,70], [130,0,0], [102, 51, 0], [100,100,100], [0,0,0]]


function setup() {
    totalBombs = 0;
    clearedCells = 0;
    document.getElementById("head").innerHTML = "Minesweeper";
    gameOver = false;
    grid = [];
    bombImg = loadImage('img/bomb.png');
    flagImg = loadImage('img/flag.png')
    var canvas = createCanvas(width, height);
    canvas.parent("canvas");
    createGrid();
    textAlign(CENTER, CENTER);
    textSize(cellSize / 2)
}

function draw() {
    background(255, 255, 255);

    fill(150);
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[j][i].cleared) {
                if (grid[j][i].bomb) {
                    fill(255, 0, 0);
                } else {
                    fill(255);
                }
            } else {
                fill(150);
            }
            rect(j * cellSize, i * cellSize, cellSize, cellSize)

            if (grid[j][i].bomb && grid[j][i].cleared) {
                image(bombImg, j * cellSize, i * cellSize, cellSize, cellSize);
            }

            if (grid[j][i].flaged && !grid[j][i].cleared) {
                image(flagImg, j * cellSize, i * cellSize, cellSize, cellSize);
            }

            if (grid[j][i].bombCount > 0 && grid[j][i].cleared) {
                var index = grid[j][i].bombCount - 1;
                fill(color[index][0], color[index][1], color[index][2]);
                text(grid[j][i].bombCount, j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}

function mouseClicked(event) {
    if (gameOver) {
        return;
    }
    if (mouseButton === LEFT) {
        if (mouseX >= 0 && mouseX < cellSize * gridSize && mouseY >= 0 && mouseY < cellSize * gridSize) {
            var x = Math.floor(mouseX / cellSize);
            var y = Math.floor(mouseY / cellSize);
            if (!grid[x][y].flaged) {
                grid[x][y].press(x, y);
            }
        }
    }
}

document.oncontextmenu = function (event) {
    if (mouseX >= 0 && mouseX < cellSize * gridSize && mouseY >= 0 && mouseY < cellSize * gridSize) {
        var x = Math.floor(mouseX / cellSize);
        var y = Math.floor(mouseY / cellSize);
        grid[x][y].flaged = grid[x][y].flaged ? false : true;
        window.navigator.vibrate(100);
    }
    return false;
}

function createGrid() {
    for (var i = 0; i < gridSize; i++) {
        var row = [];
        for (var j = 0; j < gridSize; j++) {
            if (Math.random() > 0.14) {
                row.push(new Cell(false));
            } else {
                row.push(new Cell(true));
                totalBombs++;
            }

        }
        grid.push(row);
    }
}

function checkNeighbours(x, y) {
    for (var i = y - 1; i <= y + 1; i++) {
        for (var j = x - 1; j <= x + 1; j++) {
            if (j >= 0 && j < gridSize && i >= 0 && i < gridSize && grid[j][i].bomb && !grid[x][y].bomb) {
                grid[x][y].bombCount++;
            }
        }
    }
}
