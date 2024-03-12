import { io, Socket } from "socket.io-client";
import { IMessage } from "../types/types";
import { Message_Types } from "../constants/constants";
import store from "../store/store";
import { addMessage, setMessages } from "../store/chat/chat-slice";

class SocketProvider {
  private socket: Socket | null = null;

  public connect(url: string): void {
    this.socket = io(url, {
      transports: ["websocket", "polling"],
    });
    this.socket.on(Message_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Message_Types.LOAD_MESSAGES, this.onLoadMessages);
    console.log("Socket is ready!");
  }

  private onNewMessage(msg: IMessage) {
    store.dispatch(addMessage(msg));
  }

  private onLoadMessages(list: IMessage[]) {
    store.dispatch(setMessages(list));
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendMessage(message: IMessage): void {
    if (this.socket) {
      this.socket.emit(Message_Types.NEW_MESSAGE, message);
    } else {
      console.error("Socket is not connected.");
    }
  }
}

export const socketProvider = new SocketProvider();
