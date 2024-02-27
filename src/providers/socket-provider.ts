import { io, Socket } from "socket.io-client";
import { Message } from "../types/types";
import { Message_Types } from "../constants";

class SocketProvider {
  private socket: Socket | null = null;

  public connect(url: string): void {
    this.socket = io(url, {
      transports: ["websocket", "polling"],
    });
    this.socket.on(Message_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Message_Types.LOAD_MESSAGES, this.onLoadMessages);
    console.log('Socket is ready!');
  }

  private onNewMessage(msg: string) {
    console.log('onNewMessage', msg);
  }

  private onLoadMessages(msg: string) {
    console.log("onLoadMessages", msg);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendMessage(message: Message): void {
    if (this.socket) {
      this.socket.emit(Message_Types.NEW_MESSAGE, message);
    } else {
      console.error("Socket is not connected.");
    }
  }
}

export const socketProvider = new SocketProvider();
