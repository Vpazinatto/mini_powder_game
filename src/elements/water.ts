import { Element } from '../element';
import type { Grid } from '../grid';
import { Dirt } from './dirt';
import { Mud } from './mud';

export class Water extends Element {
  static readonly ID = 2;

  constructor() {
    super(Water.ID, [50, 150, 255], 1, 2, 'Water');
  }

  interact(
    grid: Grid,
    x: number,
    y: number,
  ) {
    const neighbors = [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
    ];

    for (const [nx, ny] of neighbors) {
      if (!grid.inBounds(nx, ny)) {
        continue;
      }

      if (grid.get(nx, ny) === Dirt.ID) {
        grid.set(nx, ny, Mud.ID);
      }
    }
  }

  spread(
    grid: Grid,
    x: number,
    y: number,
    dir: number,
    getElementById: (id: number) => Element | undefined
  ) {
    if (this.canDisplace(grid, x + dir, y, getElementById)) {
      grid.swap(x, y, x + dir, y);
      return;
    }

    if (this.canDisplace(grid, x - dir, y, getElementById)) {
      grid.swap(x, y, x - dir, y);
      return;
    }

    const canFlowThroughWater = (flowDir: number, distance: number) => {
      for (let step = 1; step < distance; step++) {
        const ix = x + flowDir * step;

        if (!grid.inBounds(ix, y) || grid.get(ix, y) !== Water.ID) {
          return false;
        }
      }

      return true;
    };

    const maxFlowDistance = 8;

    // Prefer finding a nearby edge where this water can immediately fall.
    for (const flowDir of [dir, -dir]) {
      for (let distance = 2; distance <= maxFlowDistance; distance++) {
        if (!canFlowThroughWater(flowDir, distance)) {
          continue;
        }

        const targetX = x + flowDir * distance;

        if (
          this.canDisplace(grid, targetX, y, getElementById)
          && this.canDisplace(grid, targetX, y + 1, getElementById)
        ) {
          grid.swap(x, y, targetX, y);
          return;
        }
      }
    }

    // Then perform broader lateral equalization through connected water.
    for (const flowDir of [dir, -dir]) {
      for (let distance = maxFlowDistance; distance >= 2; distance--) {
        if (!canFlowThroughWater(flowDir, distance)) {
          continue;
        }

        const targetX = x + flowDir * distance;

        if (this.canDisplace(grid, targetX, y, getElementById)) {
          grid.swap(x, y, targetX, y);
          return;
        }
      }
    }
  }
}
