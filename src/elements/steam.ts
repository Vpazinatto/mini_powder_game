import { Element } from '../element';
import type { Grid } from '../grid';
import { Water } from './water';

const CONDENSATION_CHANCE = 0.00005;

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
    // Vapor tem mais chance de se condensar em água quando está na parte superior da tela.
    const shouldCondense = topBand ? random() < CONDENSATION_CHANCE * 4 : random() < CONDENSATION_CHANCE;

    if (shouldCondense) {
      grid.set(x, y, Water.ID);
      return;
    }

    super.update(grid, x, y, getElementById);
  }
}
