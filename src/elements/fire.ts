import { Element } from '../element';
import { ElementId } from '../element-id';
import type { Grid, XCoord, YCoord } from '../grid';
import { Steam } from './steam';
import { Water } from './water';

export class Fire extends Element {
  static readonly ID = ElementId.Fire;

  constructor() {
    super(Fire.ID, [255, 110, 30], -1, 0);
  }

  update(
    grid: Grid,
    x: XCoord,
    y: YCoord,
    getElementById: (id: ElementId) => Element | undefined
  ) {
    // Fogo tem uma chance de se apagar a cada atualização.
    if (random() < 0.03) {
      grid.set(x, y, ElementId.Empty);
      return;
    }

    super.update(grid, x, y, getElementById);
  }

  interact(
    grid: Grid,
    x: XCoord,
    y: YCoord,
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

    // Água em contato com o fogo tem uma chance de evaporar, transformando-se em vapor.
    if (touchedWater && random() < 0.7) {
      grid.set(x, y, ElementId.Empty);
    }
  }
}
