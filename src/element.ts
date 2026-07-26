import type { Grid, XCoord, YCoord } from './grid';
import { ElementId, elementNameFromId } from './element-id';

export abstract class Element {
  constructor(
    public id: ElementId,
    public color: number[],
    public direction: number,
    public density: number,
    public displayName = elementNameFromId(id)
  ) {}

  canDisplace(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    if (!grid.inBounds(x, y)) {
      return false;
    }

    const targetId = grid.get(x, y);

    if (targetId === ElementId.Empty) {
      return true;
    }

    const target = getElementById(targetId);

    return target !== undefined && this.density > target.density;
  }

  interact(
    _grid: Grid,
    _x: XCoord,
    _y: YCoord,
    _getElementById: (id: ElementId) => Element | undefined
  ) {}

  update(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    this.interact(grid, x, y, getElementById);

    if (this.canDisplace(grid, x, y + this.direction, getElementById)) {
      grid.swap({ x, y }, { x, y: y + this.direction });
      return;
    }

    const dir = random() < 0.5 ? -1 : 1;

    if (this.canDisplace(grid, x + dir, y + this.direction, getElementById)) {
      grid.swap({ x, y }, { x: x + dir, y: y + this.direction });
      return;
    }

    if (this.canDisplace(grid, x - dir, y + this.direction, getElementById)) {
      grid.swap({ x, y }, { x: x - dir, y: y + this.direction });
      return;
    }

    this.spread(grid, x, y, dir, getElementById);
  }

  spread(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    dir: number,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    // Elementos com densidade maior que 2 não se espalham horizontalmente como líquidos.
    if (this.density > 2) {
      return;
    }

    if (this.canDisplace(grid, x + dir, y, getElementById)) {
      grid.swap({ x, y }, { x: x + dir, y });
      return;
    }

    if (this.canDisplace(grid, x - dir, y, getElementById)) {
      grid.swap({ x, y }, { x: x - dir, y });
    }
  }

  draw(grid: Grid, x: XCoord, y: YCoord, cellSize: number) {
    fill(this.color as any);
    rect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}
