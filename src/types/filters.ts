export type EntityKind = "mall" | "floor" | "place";

export interface MallNode {
  id: string;
  name: string;
  kind: "mall";
  //children: FloorNode[];
}
/*
export interface FloorNode {
  id: string;
  name: string;
  kind: "floor";
  mallId: string;
  children: PlaceNode[];
}

export interface PlaceNode {
  id: string;
  name: string;
  kind: "place";
  mallId: string;
  floorId: string;
}
  */

export type AnyNode = MallNode;// | FloorNode | PlaceNode;

export interface FilterSelection {
  malls: string[];   // mallIds
  //floors: string[];  // floorIds
  //places: string[];  // placeIds (lojas/ambientes)
}

export interface FilterPreset {
  id: string;
  name: string;
  selection: FilterSelection;
  createdAt: number;
}
