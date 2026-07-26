export enum ElementId {
  Empty = 0,
  Dirt = 1,
  Water = 2,
  Steam = 3,
  Fire = 4,
  Mud = 5,
  Bedrock = 6,
  Lava = 7,
}

export function elementNameFromId(id: ElementId): string {
  return ElementId[id];
}
