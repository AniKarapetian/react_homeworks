
import { setDevices } from "./helpers";

class DevicesProvider {

  private isRequested: boolean = false;

  constructor() {
    navigator.mediaDevices.ondevicechange = () => {
      this.getDevices();
    };
  }

  async requestDevices() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => track.stop());
  }

  async getDevices() {
    if (!this.isRequested) {
      await this.requestDevices();
      this.isRequested = true;
    }

    navigator.mediaDevices.enumerateDevices().then(devices => {
     setDevices(devices);
    });
  }
}

export const devicesProvider = new DevicesProvider();
