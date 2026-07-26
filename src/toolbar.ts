import type { Element } from './element';
import { ElementId } from './element-id';

export class Toolbar {
  elementRegistry: Map<ElementId, Element>;
  currentId: ElementId;

  constructor(elementRegistry: Map<ElementId, Element>) {
    this.elementRegistry = elementRegistry;
    this.currentId = ElementId.Dirt;
  }

  create() {
    for (const [id, element] of this.elementRegistry) {
      this.createMaterialButton(element.displayName, id);
    }
  }

  createMaterialButton(name: string, id: ElementId) {
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
