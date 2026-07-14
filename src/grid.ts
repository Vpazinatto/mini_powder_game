export class Grid {
  cellSize: number;
  cols: number;
  rows: number;
  grid: number[][];

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;

    this.cols = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);

    this.grid = Array(this.cols)
      .fill(undefined)
      .map(() => Array(this.rows).fill(0));
  }

  canMove(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
      return false;
    }

    return this.grid[x][y] === 0;
  }

  swap(x1: number, y1: number, x2: number, y2: number) {
    [this.grid[x2][y2], this.grid[x1][y1]] = [this.grid[x1][y1], this.grid[x2][y2]];
  }

  set(x: number, y: number, value: number) {
    this.grid[x][y] = value;
  }

  get(x: number, y: number) {
    return this.grid[x][y];
  }

  inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
  }

  forEachDescending(callback: (x: number, y: number, value: number) => void) {
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = 0; x < this.cols; x++) {
        callback(x, y, this.grid[x][y]);
      }
    }
  }

  forEachAscending(callback: (x: number, y: number, value: number) => void) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        callback(x, y, this.grid[x][y]);
      }
    }
  }
}
