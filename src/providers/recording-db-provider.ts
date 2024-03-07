import { STORE_NAME } from "../constants/constants";
import { ChunkInfo } from "../types/types";
import { db } from "./db-provider";

class RecordingDBProvider {
  getItems(): Promise<ChunkInfo[]> {
    return db.getAll(STORE_NAME);
  }

  addItem(chunk: ChunkInfo): Promise<ChunkInfo | undefined> {
    return db.addItem<ChunkInfo>(chunk, STORE_NAME);
  }

  clearStore() {
    db.clearStore(STORE_NAME);
  }
}

export const recordingDBProvider = new RecordingDBProvider();
