import { Coordinate } from "../providers/game-providers/types";

export const generateShipCoordinates = (length: number) => {
  const coords: Coordinate[] = [];

  const isHorizontal = Math.random() < 0.5;

  let startRow, startCol;
  do {
    if (isHorizontal) {
      startRow = Math.floor(Math.random() * 10);
      startCol = Math.floor(Math.random() * (10 - length + 1));
    } else {
      startRow = Math.floor(Math.random() * (10 - length + 1));
      startCol = Math.floor(Math.random() * 10);
    }
  } while (!(startRow + length > 10 || startCol + length > 10));

  for (let i = 0; i < length; i++) {
    const row = isHorizontal ? startRow : startRow + i;
    const col = isHorizontal ? startCol + i : startCol;
    coords.push({ row, col });
  }
  return coords;
};
