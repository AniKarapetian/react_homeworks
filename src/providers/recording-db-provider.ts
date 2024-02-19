import { STORE_NAME } from "../constants";
import { ChunkInfo } from "../types/types";
import { db } from "./db-provider";

class RecordingDBProvider {

  getItems(): Promise<ChunkInfo[] | undefined> {
    return db.getAll(STORE_NAME);
  }

  async addItem(chunk: ChunkInfo
    ): Promise<ChunkInfo | undefined> {
    return db.addItem<ChunkInfo>(chunk, STORE_NAME);
  }
}

export const recordingDBProvider = new RecordingDBProvider();
