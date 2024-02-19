import { CHUNK_DURATION, STORE_NAME } from "../constants";
import { db } from "./db-provider";



class RecorderProvider {
  private recorder: MediaRecorder | null = null;
  private chunkId: number = 1;

  start(stream: MediaStream) {
    this.recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    this.recorder.onstart = () => {
      console.log("Recording started.");
    };

    this.recorder.ondataavailable = (event: BlobEvent) => {
      console.log("Data available");
      db.addItem({
        chunkId: this.chunkId++,
        data: event.data,
      }, STORE_NAME).then(() => {
        console.log(`Chunk with ${this.chunkId} id was added.`);
      });
    };

    this.recorder.onstop = () => {
      console.log("Recording stopped.");
    };
    this.recorder.start(CHUNK_DURATION);
  }

  stop() {
    if (!this.recorder) {
      return;
    }
    this.recorder.stop();
    this.recorder = null;
  }
}


 const recorderProvider = new RecorderProvider();
 export default recorderProvider;