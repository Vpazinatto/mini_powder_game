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
      // Use a stable displayName set on each Element subclass so it
      // doesn't break when class names are mangled during build/minify.
      const label = (element as any).displayName ?? (element as any).constructor.name;
      this.createMaterialButton(label, id);
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
