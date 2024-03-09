export type ShipType =
  | "carrier"
  | "battleship"
  | "cruiser"
  | "submarine"
  | "destroyer";

export interface Ship {
  type: ShipType;
  length: number;
  hits: number;
  coordinates: Coordinate[];
}

export interface Coordinate {
  row: number;
  col: number;
}
