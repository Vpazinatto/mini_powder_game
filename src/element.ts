/// <reference types="p5/global" />
import type { Grid } from "./grid";

export abstract class Element {
  constructor(
    public id: number,
    public color: number[],
    public direction: number,
    public density: number,
    public displayName = "Element"
  ) {}

  canDisplace(
    grid: Grid,
    x: number,
    y: number,
    getElementById: (id: number) => Element | undefined
  ) {
    if (!grid.inBounds(x, y)) {
      return false;
    }

    const targetId = grid.get(x, y);

    if (targetId === 0) {
      return true;
    }

    const target = getElementById(targetId);

    return target !== undefined && this.density > target.density;
  }

  interact(
    _grid: Grid,
    _x: number,
    _y: number,
    _getElementById: (id: number) => Element | undefined
  ) {}

  update(
    grid: Grid,
    x: number,
    y: number,
    getElementById: (id: number) => Element | undefined
  ) {
    this.interact(grid, x, y, getElementById);

    if (this.canDisplace(grid, x, y + this.direction, getElementById)) {
      grid.swap(x, y, x, y + this.direction);
      return;
    }

    const dir = random() < 0.5 ? -1 : 1;

    if (this.canDisplace(grid, x + dir, y + this.direction, getElementById)) {
      grid.swap(x, y, x + dir, y + this.direction);
      return;
    }

    if (this.canDisplace(grid, x - dir, y + this.direction, getElementById)) {
      grid.swap(x, y, x - dir, y + this.direction);
      return;
    }

    this.spread(grid, x, y, dir, getElementById);
  }

  spread(
    grid: Grid,
    x: number,
    y: number,
    dir: number,
    getElementById: (id: number) => Element | undefined
  ) {
    // Elementos com densidade maior que 2 não se espalham horizontalmente como líquidos.
    if (this.density > 2) {
      return;
    }

    if (this.canDisplace(grid, x + dir, y, getElementById)) {
      grid.swap(x, y, x + dir, y);
      return;
    }

    if (this.canDisplace(grid, x - dir, y, getElementById)) {
      grid.swap(x, y, x - dir, y);
    }
  }

  draw(grid: Grid, x: number, y: number, cellSize: number) {
    fill(this.color as any);
    rect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}
