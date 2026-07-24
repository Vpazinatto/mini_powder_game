import { Grid } from './grid';
import type { Element } from './element';

export class Simulation {
  grid: Grid;
  cellSize: number;

  elements: Map<number, Element>;
  fallingIds: Set<number>;
  risingIds: Set<number>;

  constructor(width: number, height: number, cellSize: number) {
    this.grid = new Grid(width, height, cellSize);
    this.cellSize = cellSize;

    this.elements = new Map();
    this.fallingIds = new Set();
    this.risingIds = new Set();
  }

  register(element: Element) {
    this.elements.set(element.id, element);

    if (element.direction > 0) {
      this.fallingIds.add(element.id);
    } else {
      this.risingIds.add(element.id);
    }
  }

  update() {
    // Atualiza primeiro as partículas que caem (de baixo para cima) e depois
    // as que sobem (de cima para baixo), evitando sobreposições indesejadas.
    this.grid.forEachDescending((x, y, id) => {
      if (!this.fallingIds.has(id)) return;

      const element = this.elements.get(id);
      element?.update(this.grid, x, y, targetId => this.elements.get(targetId));
    });

    this.grid.forEachAscending((x, y, id) => {
      if (!this.risingIds.has(id)) return;

      const element = this.elements.get(id);
      element?.update(this.grid, x, y, targetId => this.elements.get(targetId));
    });
  }

  draw() {
    // Renderiza o grid, desenhando cada célula com a cor do elemento correspondente.
    for (let x = 0; x < this.grid.cols; x++) {
      for (let y = 0; y < this.grid.rows; y++) {
        const id = this.grid.get(x, y);

        if (id === 0) continue;

        const element = this.elements.get(id);

        if (!element) continue;

        fill(element.color);
        rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }

  paint(mouseX: number, mouseY: number, elementId: number, brushSize = 2) {
    const gx = Math.floor(mouseX / this.cellSize);
    const gy = Math.floor(mouseY / this.cellSize);

    for (let dx = -brushSize; dx <= brushSize; dx++) {
      for (let dy = -brushSize; dy <= brushSize; dy++) {
        const x = gx + dx;
        const y = gy + dy;

        if (this.grid.inBounds(x, y)) {
          this.grid.set(x, y, elementId);
        }
      }
    }
  }
}
