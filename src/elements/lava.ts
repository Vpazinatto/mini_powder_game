import { Element } from '../element';
import { ElementId } from '../element-id';
import type { Grid, XCoord, YCoord } from '../grid';
import { Bedrock } from './bedrock';
import { Steam } from './steam';
import { Water } from './water';

export class Lava extends Element {
  static readonly ID = ElementId.Lava;

  constructor() {
    super(Lava.ID, [240, 90, 20], 1, 2.2);
  }

  update(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    const neighbors = [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
    ];

    let touchedWater = false;

    for (const [nx, ny] of neighbors) {
      if (!grid.inBounds(nx, ny)) {
        continue;
      }

      if (grid.get(nx, ny) === Water.ID) {
        grid.set(nx, ny, Steam.ID);
        touchedWater = true;
      }
    }

    if (touchedWater) {
      grid.set(x, y, Bedrock.ID);
      return;
    }

    super.update(grid, x, y, getElementById);
  }

  spread(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    dir: number,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    if (this.canDisplace(grid, x + dir, y, getElementById)) {
      grid.swap({ x, y }, { x: x + dir, y });
      return;
    }

    if (this.canDisplace(grid, x - dir, y, getElementById)) {
      grid.swap({ x, y }, { x: x - dir, y });
      return;
    }

    for (const flowDir of [dir, -dir]) {
      const bridgeX = x + flowDir;
      const targetX = x + flowDir * 2;

      if (!grid.inBounds(targetX, y)) {
        continue;
      }

      if (grid.get(bridgeX, y) !== Lava.ID) {
        continue;
      }

      if (this.canDisplace(grid, targetX, y, getElementById)) {
        grid.swap({ x, y }, { x: targetX, y });
        return;
      }
    }
  }
}
