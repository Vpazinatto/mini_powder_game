/// <reference types="p5/global" />
import type { Grid } from "./grid";

export class Element {
  id: number;
  color: number[];
  direction: number;
  displayName: string;

  constructor(id: number, color: number[], direction: number, displayName = 'Element') {
    this.id = id;
    this.color = color;
    this.direction = direction;
    this.displayName = displayName;
  }

  update(grid: Grid, x: number, y: number) {
    if (grid.canMove(x, y + this.direction)) {
      grid.swap(x, y, x, y + this.direction);
      return;
    }

    const dir = random() < 0.5 ? -1 : 1;

    if (grid.canMove(x + dir, y + this.direction)) {
      grid.swap(x, y, x + dir, y + this.direction);
      return;
    }

    if (grid.canMove(x - dir, y + this.direction)) {
      grid.swap(x, y, x - dir, y + this.direction);
      return;
    }

    this.spread(grid, x, y, dir);
  }

  spread(grid: Grid, x: number, y: number, dir: number) {
    if (grid.canMove(x + dir, y)) {
      grid.swap(x, y, x + dir, y);
      return;
    }

    if (grid.canMove(x - dir, y)) {
      grid.swap(x, y, x - dir, y);
    }
  }

  draw(grid: Grid, x: number, y: number, cellSize: number) {
    fill(this.color as any);
    rect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}
