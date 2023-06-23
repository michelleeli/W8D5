// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  const Piece = require("./piece");
}
// DON'T TOUCH THIS CODE


/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4].
 */
function _makeGrid() {
  const grid = new Array(8);
  for(let i=0; i < grid.length; i ++) {
    grid[i] = new Array(8);
  }
  grid[3][4] = new Piece("black")
  grid[4][3] = new Piece("black")
  grid[3][3] = new Piece("white")
  grid[4][4] = new Piece("white")

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let [x, y] = pos;
  if (x < 0 || y < 0 || x > 7 || y > 7) {
    return false;
  } else {
    return true;
  }
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const [x, y] = pos;
  if (!this.isValidPos(pos)) {
    throw new Error ("Not valid pos!");
  } else {
    return this.grid[x][y];
  };
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  const [x,y] = pos;
  if (!!this.grid[x][y]){
    if (this.grid[x][y].color === color) {
      return true;
    } else {
      return false;
    }}
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const [x,y] = pos;
  return !!this.grid[x][y];
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding 
 * another piece of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip=[]) {
  const [x,y] = pos;
  const [i,j] = dir;
  let newPos = [(x+i), (y+j)];

  if (!this.isValidPos(newPos)) {
    return [];
  } else if (!this.isOccupied(newPos)) {
    return [];
  } else if (this.isMine(newPos, color)){
    return piecesToFlip;
  } else if (!this.isMine(newPos, color)){
    piecesToFlip.push(newPos);
    return this._positionsToFlip(newPos, color, dir, piecesToFlip)
  } 
}

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  // if (this.isOccupied(pos)){
  //   return false;
  // }
  let value = false;
  Board.DIRS.forEach (dir => {
    if (this._positionsToFlip(pos, color, dir).length !== 0){
      value = true;
    }
  });
  return value; 
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw new Error ("Invalid move!")
  } else {
    const [x, y] = pos;
    this.grid[x][y] = new Piece(color);
  }
  
  Board.DIRS.forEach (dir => {
    this._positionsToFlip(pos, color, dir).forEach (pos => {
      this.getPiece(pos).flip;
    })
  })
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE