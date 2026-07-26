import { Element } from '../element';
import { ElementId } from '../element-id';

export class Mud extends Element {
  static readonly ID = ElementId.Mud;

  constructor() {
    super(Mud.ID, [95, 74, 48], 1, 2.6);
  }
}
