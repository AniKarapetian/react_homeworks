import { DB_NAME, DB_VERSION, STORE_NAME } from "../constants/constants";
import { ChunkInfo, ItemType } from "../types/types";

export class DBConnection {
  db: IDBDatabase | null = null;
  async connect() {
    if (this.db) {
      return this.db;
    }
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = ({ target }) => {
        reject(
          `Failed to open database: ${(target as IDBOpenDBRequest).error}`
        );
      };

      request.onsuccess = ({ target }) => {
        this.db = (target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onupgradeneeded = ({ target }) => {
        const db = (target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { autoIncrement: true });
        }
      };
    });
  }

  async getAll<T>(storeName: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return;
      }
      const transaction = this.db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result as T);
      };

      request.onerror = ({ target }) => {
        reject(`Failed to get all data: ${(target as IDBOpenDBRequest).error}`);
      };
    });
  }

  async clearStore(storeName: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return;
      }
      const transaction = this.db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = ({ target }) => {
        reject(`Failed to get all data: ${(target as IDBOpenDBRequest).error}`);
      };
    });
  }

  async addItem<T>(item: T, storeName: string): Promise<T | undefined> {
    if (!this.db) {
      return;
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(item);

      request.onsuccess = () => {
        resolve(request.result as T);
      };

      request.onerror = ({ target }) => {
        reject(`Failed to add item: ${(target as IDBOpenDBRequest).error}`);
      };
    });
  }
}

export const db = new DBConnection();
