
// Depth-first search
// recursive backtracker

var cols, rows;
var order = 20;
var canvasDimension = 800;
// var frames = 500;
var w;
var grid = [];
var stack = [];
var path = [];

var current;
var start_time;
var end_time;
var finished = false;

function setup() {
  alert('Wait till the maze generation is completed. Use your arrow keys to move the blue box from start point (0,0) to end point (row, col)')
  createCanvas(canvasDimension, canvasDimension);
  w = floor(canvasDimension / order);
  cols = floor(width / w);
  rows = floor(height / w);
  // frameRate(frames);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++)
    grid[i].show();

  current.visited = true;
  current.highlight();
  //STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current); //STEP 2
    removeWalls(current, next); //STEP 3
    current = next; //STEP 4
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    if (!finished) {
      startPlay();
    }
  }
}




function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
    return -1;
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function checkIfWon(current) {
  if (current.i === current.j)
    if (current.i === cols - 1) {
      end_time = new Date().getTime();
      var difference = end_time - start_time;
      var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((difference % (1000 * 60)) / 1000);
      if (confirm(`You completed the maze in ${hours} hours ${minutes} minutes and ${seconds} seconds. Play again?`))
        resetMaze();
    }
}


function resetMaze() {
  window.document.location.reload(true);
}


function startPlay() {
  start_time = new Date().getTime();
  finished = true;
  window.addEventListener('keydown', function (event) {
    current_index = index(current.i, current.j);
    switch (event.key) {
      case "ArrowRight":
        if (current.i < cols - 1) {
          if (!current.walls[1]) {
            current = grid[current_index + 1];
            checkIfWon(current);
          }
        }
        break;
      case "ArrowLeft":
        if (current.i > 0) {
          if (!current.walls[3]) {
            current = grid[current_index - 1];
            checkIfWon(current);
          }
        }
        break;
      case "ArrowUp":
        if (current.j > 0) {
          if (!current.walls[0]) {
            current = grid[current_index - cols];
            checkIfWon(current);
          }
        }
        break;
      case "ArrowDown":
        if (current.j < rows - 1) {
          if (!current.walls[2]) {
            current = grid[current_index + cols];
            checkIfWon(current);
          }
        }
        break;
    }
  });
}