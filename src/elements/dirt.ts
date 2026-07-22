import { Element } from '../element';
import type { Grid } from '../grid';
import { Mud } from './mud';
import { Water } from './water';

export class Dirt extends Element {
  static readonly ID = 1;

  constructor() {
    super(Dirt.ID, [130, 90, 40], 1, 3, 'Dirt');
  }

  update(
    grid: Grid,
    x: number,
    y: number,
    getElementById: (id: number) => Element | undefined
  ) {
    const neighbors = [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (!grid.inBounds(nx, ny)) {
        continue;
      }

      if (grid.get(nx, ny) === Water.ID) {
        grid.set(x, y, Mud.ID);
        return;
      }
    }

    super.update(grid, x, y, getElementById);
  }
}
