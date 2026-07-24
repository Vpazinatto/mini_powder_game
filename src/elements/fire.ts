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
    // Fogo tem uma chance de se apagar a cada atualização.
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
      grid.set(x, y, 0);
    }
  }
}
