import {
  AnswerType,
  BOARD_VALUES,
  BoardEventTypes,
} from "../../constants/constants";
import EventEmitter from "../../helpers/EventEmitter";
import { generateShipCoordinates } from "../../helpers/generateShipCoordinates";
import { gameProvider } from "./game-provider";
import { Ship } from "./types";

class EnemyBoardProvider {
  ships: Ship[] = [
    {
      type: "carrier",
      length: 5,
      hits: 0,
      coordinates: generateShipCoordinates(5),
    },
    {
      type: "battleship",
      length: 4,
      hits: 0,
      coordinates: generateShipCoordinates(4),
    },
    {
      type: "cruiser",
      length: 3,
      hits: 0,
      coordinates: generateShipCoordinates(3),
    },
    {
      type: "submarine",
      length: 3,
      hits: 0,
      coordinates: generateShipCoordinates(3),
    },
    {
      type: "destroyer",
      length: 2,
      hits: 0,
      coordinates: generateShipCoordinates(2),
    },
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

  public setAnswer(answerType: string, i: number, j: number) {
    if (gameProvider.checkIsGameOver()) return;
    switch (answerType) {
      case AnswerType.MISS: {
        this.board[i][j] = BOARD_VALUES.MISS;
        break;
      }
      case AnswerType.HIT: {
        this.board[i][j] = BOARD_VALUES.HIT;
        break;
      }
      case AnswerType.KILL: {
        this.board[i][j] = BOARD_VALUES.KILL;
        break;
      }
    }
    this.render();
  }

  private render() {
    this.eventEmitter.emit(BoardEventTypes.ON_UPDATE, [...this.board]);
  }
  placeShips(): void {
    this.ships.forEach((ship) => {
      ship.coordinates.forEach((coord) => {
        this.board[coord.row][coord.col] = BOARD_VALUES.SHIP;
      });
    });
  }
}

export const enemyBoardProvider = new EnemyBoardProvider();
