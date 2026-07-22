import { Element } from '../element';

export class Mud extends Element {
  static readonly ID = 5;

  constructor() {
    super(Mud.ID, [95, 74, 48], 1, 2.6, 'Mud');
  }
}
