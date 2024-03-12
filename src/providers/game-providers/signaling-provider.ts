import { io, Socket } from "socket.io-client";
import EventEmitter from "../../helpers/EventEmitter";
import {
  MessagesEventTypes,
  MessageTypes,
  SOCKET_URL,
} from "../../constants/constants";
import { AskMessageModel, AnswerMessageModel } from "../../types/types";
import store from "../../store/store";
const userId = store.getState().login.user?.id;
class SignalingProvider {
  private socket: Socket | null = null;
  public eventEmitter: EventEmitter = new EventEmitter();

  public init() {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on(MessageTypes.ASK, this.onAsk);
    this.socket.on(MessageTypes.ANSWER, this.onAnswer);
    this.socket.on(MessagesEventTypes.GAME_OVER, this.onGameOver);
  }

  private onAsk = (askData: AskMessageModel) => {
    if (askData.userId === userId) return;
    this.eventEmitter.emit(MessagesEventTypes.ON_ASK, askData);
  };

  private onAnswer = (answerData: AnswerMessageModel) => {
    if (answerData.userId === userId) return;
    this.eventEmitter.emit(MessagesEventTypes.ON_ANSWER, answerData);
  };

  private onGameOver = (winner: string) => {
    this.eventEmitter.emit(MessagesEventTypes.GAME_OVER, winner);
  };

  public sendMessage(
    type: string,
    data: AskMessageModel | AnswerMessageModel | string
  ) {
    if (!this.socket) {
      console.log("Socket is not initialized!");
      return;
    }
    this.socket.emit(type, data);
  }
}

export const signalingProvider = new SignalingProvider();
