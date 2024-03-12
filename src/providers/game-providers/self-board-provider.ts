import {
  AnswerType,
  BOARD_VALUES,
  BoardEventTypes,
  MessageTypes,
} from "../../constants/constants";
import EventEmitter from "../../helpers/EventEmitter";
import { generateShipCoordinates } from "../../helpers/generateShipCoordinates";
import store from "../../store/store";
import { gameProvider } from "./game-provider";
import { signalingProvider } from "./signaling-provider";
import { Ship, Coordinate } from "./types";
const userId = store.getState().login.user?.id;

class SelfBoardProvider {
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
        this.board[i][j] = BOARD_VALUES.EMPTY;
      }
    }
    this.placeShips();
    this.render();
  }

  public checkAttack(i: number, j: number) {
    if (gameProvider.checkIsGameOver()) return;
    let answerType = AnswerType.MISS;
    switch (this.board[i][j]) {
      case BOARD_VALUES.EMPTY:
        answerType = AnswerType.MISS;
        this.board[i][j] = 2;
        break;
      case BOARD_VALUES.SHIP:
        answerType = AnswerType.HIT;
        this.board[i][j] = 3;
        const hitShip = this.ships.find((ship) =>
          ship.coordinates.some(
            (coord: Coordinate) => coord.row === i && coord.col === j
          )
        );

        if (hitShip) {
          hitShip.hits++;
          if (hitShip.hits === hitShip.length) {
            answerType = AnswerType.KILL;
          }
        } else {
          answerType = AnswerType.HIT;
        }

        break;
    }

    signalingProvider.sendMessage(MessageTypes.ANSWER, {
      userId: userId!,
      answerType,
      i,
      j,
    });
    this.render();
    if (gameProvider.checkIsGameOver()) return;
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

export const selfBoardProvider = new SelfBoardProvider();
