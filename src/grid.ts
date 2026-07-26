import { ElementId } from './element-id';

export type XCoord = number;
export type YCoord = number;

export type Position = {
  x: XCoord;
  y: YCoord;
};

export class Grid {
  cellSize: number;
  cols: number;
  rows: number;
  grid: ElementId[][];

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;

    this.cols = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);

    this.grid = Array(this.cols)
      .fill(undefined)
      .map(() => Array(this.rows).fill(ElementId.Empty));
  }

  canMove(x: XCoord, y: YCoord) {
    if (!this.inBounds(x, y)) {
      return false;
    }

    return this.grid[x][y] === ElementId.Empty;
  }

  swap(first: Position, second: Position) {
    [this.grid[second.x][second.y], this.grid[first.x][first.y]] = [
      this.get(first.x, first.y),
      this.get(second.x, second.y),
    ];
  }

  set(x: XCoord, y: YCoord, value: ElementId) {
    this.grid[x][y] = value;
  }

  get(x: XCoord, y: YCoord): ElementId {
    return this.grid[x][y];
  }

  inBounds(x: XCoord, y: YCoord) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
  }

  forEachDescending(callback: (x: XCoord, y: YCoord, value: ElementId) => void) {
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = 0; x < this.cols; x++) {
        callback(x, y, this.grid[x][y]);
      }
    }
  }

  forEachAscending(callback: (x: XCoord, y: YCoord, value: ElementId) => void) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        callback(x, y, this.grid[x][y]);
      }
    }
  }
}
