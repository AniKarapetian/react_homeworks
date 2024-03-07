import { selfBoardProvider } from "./self-board-provider";
import { enemyBoardProvider } from "./enemy-board-provider";
import { signalingProvider } from "./signaling-provider";
import { MessageTypes, MessagesEventTypes } from "../../constants/constants";
import { AnswerMessageModel, AskMessageModel } from "../../types/types";

class GameProvider {
  constructor() {
    signalingProvider.eventEmitter.on(MessagesEventTypes.ON_ASK, this.onAsk);
    signalingProvider.eventEmitter.on(
      MessagesEventTypes.ON_ANSWER,
      this.onAnswer
    );
  }

  public init() {
    signalingProvider.init();
    selfBoardProvider.init();
    enemyBoardProvider.init();
  }

  public ask(i: number, j: number, userId: string) {
    signalingProvider.sendMessage(MessageTypes.ASK, {
      userId,
      i,
      j,
    });
  }

  private onAsk({ i, j }: AskMessageModel) {
    console.log("game-provider", "onAsk");
    selfBoardProvider.checkAttack(i, j);
  }

  private onAnswer({ answerType }: AnswerMessageModel) {
    enemyBoardProvider.setAnswer(answerType);
  }

  isGameOver(): boolean {
    return (
      selfBoardProvider.ships.every((ship) => ship.hits === ship.length) ||
      enemyBoardProvider.ships.every((ship) => ship.hits === ship.length)
    );
  }
}

export const gameProvider = new GameProvider();
