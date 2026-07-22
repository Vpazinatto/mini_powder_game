import { Element } from '../element';
import type { Grid } from '../grid';
import { Water } from './water';

export class Steam extends Element {
  static readonly ID = 3;

  constructor() {
    super(Steam.ID, [220], -1, 1, 'Steam');
  }

  update(
    grid: Grid,
    x: number,
    y: number,
    getElementById: (id: number) => Element | undefined
  ) {
    const topBand = y < grid.rows * 0.2;
    const shouldCondense = topBand ? random() < 0.005 : random() < 0.00005;

    if (shouldCondense) {
      grid.set(x, y, Water.ID);
      return;
    }

    super.update(grid, x, y, getElementById);
  }
}
