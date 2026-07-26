import { Element } from '../element';
import { ElementId } from '../element-id';
import type { Grid, XCoord, YCoord } from '../grid';
import { Water } from './water';

const CONDENSATION_CHANCE = 0.00005;

export class Steam extends Element {
  static readonly ID = ElementId.Steam;

  constructor() {
    super(Steam.ID, [220], -1, 1);
  }

  update(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    getElementById: (id: ElementId) => Element | undefined
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
