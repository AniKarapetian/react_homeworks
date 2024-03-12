import { selfBoardProvider } from "./self-board-provider";
import { enemyBoardProvider } from "./enemy-board-provider";
import { signalingProvider } from "./signaling-provider";
import { MessageTypes, MessagesEventTypes } from "../../constants/constants";
import { AnswerMessageModel, AskMessageModel } from "../../types/types";
import store from "../../store/store";
const user = store.getState().login.user;
class GameProvider {
  constructor() {
    signalingProvider.eventEmitter.on(
      MessagesEventTypes.GAME_OVER,
      this.onGameOver
    );
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
  onGameOver = (winner: string) => {
    alert(`Game is over. ${winner} won!`);
    this.init();
  };

  private onAsk({ i, j }: AskMessageModel) {
    selfBoardProvider.checkAttack(i, j);
  }

  private onAnswer({ answerType, i, j }: AnswerMessageModel) {
    enemyBoardProvider.setAnswer(answerType, i, j);
  }

  public checkIsGameOver(): boolean {
    let winner = "";
    if (enemyBoardProvider.ships.every((ship) => ship.hits === ship.length)) {
      winner = `${user?.name} ${user?.lastname}`;
      signalingProvider.sendMessage(MessagesEventTypes.GAME_OVER, winner);
      return true;
    }
    if (selfBoardProvider.ships.every((ship) => ship.hits === ship.length)) {
      winner = "Enemy";
      signalingProvider.sendMessage(MessagesEventTypes.GAME_OVER, winner);
      return true;
    }

    return false;
  }
}

export const gameProvider = new GameProvider();
