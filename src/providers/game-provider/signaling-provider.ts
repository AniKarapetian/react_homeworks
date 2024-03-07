import { io, Socket } from "socket.io-client";
import EventEmitter from "../../helpers/EventEmitter";
import {
  MessagesEventTypes,
  MessageTypes,
  SOCKET_URL,
} from "../../constants/constants";
import { AskMessageModel, AnswerMessageModel } from "../../types/types";

class SignalingProvider {
  private socket: Socket | null = null;
  public eventEmitter: EventEmitter = new EventEmitter();

  public init() {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on(MessageTypes.ASK, this.onAsk);
    this.socket.on(MessageTypes.ANSWER, this.onAnswer);
  }

  private onAsk = (askData: AskMessageModel) => {
    console.log("askData", askData);
    this.eventEmitter.emit(MessagesEventTypes.ON_ASK, askData);
  };

  private onAnswer = (answerData: AnswerMessageModel) => {
    console.log("answerData", answerData);
    this.eventEmitter.emit(MessagesEventTypes.ON_ANSWER, answerData);
  };

  public sendMessage(type: string, data: AskMessageModel | AnswerMessageModel) {
    if (!this.socket) {
      console.log("Socket is not initialized!");
      return;
    }
    this.socket.emit(type, data);
  }
}

export const signalingProvider = new SignalingProvider();
