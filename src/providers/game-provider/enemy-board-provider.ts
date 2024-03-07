import {
  AnswerType,
  BOARD_VALUES,
  BoardEventTypes,
} from "../../constants/constants";
import EventEmitter from "../../helpers/EventEmitter";
import { Ship, Coordinate } from "./types";

const carrierCoords = [
  { row: 0, col: 0 },
  { row: 1, col: 0 },
  { row: 2, col: 0 },
  { row: 3, col: 0 },
  { row: 4, col: 0 },
];

const battleshipCoords = [
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 1, col: 5 },
  { row: 1, col: 6 },
];

const submarineCoords = [
  { row: 4, col: 5 },
  { row: 4, col: 6 },
  { row: 4, col: 7 },
];

const cruiserCoords = [
  { row: 4, col: 2 },
  { row: 5, col: 2 },
  { row: 6, col: 2 },
];

const destroyerCoords = [
  { row: 7, col: 6 },
  { row: 7, col: 7 },
];

class EnemyBoardProvider {
  ships: Ship[] = [
    { type: "carrier", length: 5, hits: 0, coordinates: carrierCoords },
    { type: "battleship", length: 4, hits: 0, coordinates: battleshipCoords },
    { type: "cruiser", length: 3, hits: 0, coordinates: cruiserCoords },
    { type: "submarine", length: 3, hits: 0, coordinates: submarineCoords },
    { type: "destroyer", length: 2, hits: 0, coordinates: destroyerCoords },
  ];
  private board: number[][] = [];
  public eventEmitter: EventEmitter = new EventEmitter();

  public init() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = 0;
      }
    }
    this.placeShips();
    this.render();
  }

  public setAnswer(answerType: string) {
    console.log("answerType", answerType);
    switch (answerType) {
      // TODO: Implement cases
      case AnswerType.MISS: {
        break;
      }
      case AnswerType.HIT: {
        break;
      }
      case AnswerType.KILL: {
        break;
      }
    }
    this.render();
  }

  private render() {
    this.eventEmitter.emit(BoardEventTypes.ON_UPDATE, this.board);
  }
  placeShips(): void {
    this.ships.forEach((ship) => {
      ship.coordinates.forEach((coord) => {
        this.board[coord.row][coord.col] = BOARD_VALUES.SHIP;
      });
    });
    // this.render();
  }
}

export const enemyBoardProvider = new EnemyBoardProvider();
