/// <reference types="p5/global" />
import type { Element } from './element';

export class Toolbar {
  elementRegistry: Map<number, Element>;
  currentId: number;

  constructor(elementRegistry: Map<number, Element>) {
    this.elementRegistry = elementRegistry;
    this.currentId = 1;
  }

  create() {
    for (const [id, element] of this.elementRegistry) {
      this.createMaterialButton((element as any).constructor.name, id);
    }
  }

  createMaterialButton(name: string, id: number) {
    const btn = createButton(name);

    btn.parent('toolbar');

    if (id === this.currentId) {
      btn.addClass('active');
    }

    btn.mousePressed(() => {
      this.currentId = id;

      selectAll('button').forEach(button => {
        button.removeClass('active');
      });

      btn.addClass('active');
    });
  }
}
