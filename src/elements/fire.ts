import { Element } from '../element';
import type { Grid } from '../grid';
import { Steam } from './steam';
import { Water } from './water';

export class Fire extends Element {
  static readonly ID = 4;

  constructor() {
    super(Fire.ID, [255, 110, 30], -1, 0, 'Fire');
  }

  update(
    grid: Grid,
    x: number,
    y: number,
    getElementById: (id: number) => Element | undefined
  ) {
    // Fire has a short lifetime to avoid permanent blobs.
    if (random() < 0.03) {
      grid.set(x, y, 0);
      return;
    }

    super.update(grid, x, y, getElementById);
  }

  interact(
    grid: Grid,
    x: number,
    y: number,
    _getElementById: (id: number) => Element | undefined
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

    // Water usually extinguishes fire after the reaction.
    if (touchedWater && random() < 0.7) {
      grid.set(x, y, 0);
    }
  }
}
