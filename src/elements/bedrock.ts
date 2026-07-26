import { Element } from '../element';
import { ElementId } from '../element-id';

export class Bedrock extends Element {
  static readonly ID = ElementId.Bedrock;

  constructor() {
    super(Bedrock.ID, [90, 90, 95], 1, 3);
  }
}
