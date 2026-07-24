import { Element } from '../element';
import type { Grid } from '../grid';

export class Water extends Element {
  static readonly ID = 2;

  constructor() {
    super(Water.ID, [50, 150, 255], 1, 2, 'Water');
  }

  spread(
    grid: Grid,
    x: number,
    y: number,
    dir: number,
    getElementById: (id: number) => Element | undefined
  ) {
    // Primeiro tenta espalhar para os lados como liquido comum.
    if (this.canDisplace(grid, x + dir, y, getElementById)) {
      grid.swap(x, y, x + dir, y);
      return;
    }

    if (this.canDisplace(grid, x - dir, y, getElementById)) {
      grid.swap(x, y, x - dir, y);
      return;
    }

    // Se estiver bloqueada, tenta um salto curto por cima de agua conectada
    // para ajudar a nivelar pequenas ondulacoes.
    for (const flowDir of [dir, -dir]) {
      const bridgeX = x + flowDir;
      const targetX = x + flowDir * 2;

      if (!grid.inBounds(targetX, y)) {
        continue;
      }

      if (grid.get(bridgeX, y) !== Water.ID) {
        continue;
      }

      if (this.canDisplace(grid, targetX, y, getElementById)) {
        grid.swap(x, y, targetX, y);
        return;
      }
    }
  }
}
