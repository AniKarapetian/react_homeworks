import { EventEmitter } from "stream";
import { TIME_EVENTS } from "../constants/constants";

class TimeProvider {
  time: number = 0;
  eventEmitter: EventEmitter = new EventEmitter();

  setTime(time: number) {
    this.time = time;
    this.eventEmitter.emit(TIME_EVENTS.ON_UPDATE, time);
  }
}

export const timeProvider = new TimeProvider();
