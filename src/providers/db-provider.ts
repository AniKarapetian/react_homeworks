import { ChunkInfo, ItemType } from "../types/types";

export class DBConnection {
    dbName: string;
    version: number;
    storeName: string;
    db: IDBDatabase|null;
    constructor(dbName:string, version:number, storeName: string) {
      this.dbName = dbName;
      this.version = version;
      this.storeName = storeName;
      this.db = null;
    }
  
    async connect() {
        if (this.db){
            return this.db;
        }
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
  
        request.onerror = ({target}) => {
          reject(`Failed to open database: ${(target as IDBOpenDBRequest).error}`);
        };
  
        request.onsuccess = ({target}) => {
          this.db = (target as IDBOpenDBRequest).result;
          resolve(this.db);
        };
  
        request.onupgradeneeded = ({target}) => {
          const db = (target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { autoIncrement: true });
          }
        };
      });
    }
  
  
    async getAll() {
      return new Promise((resolve, reject) => {
        if (!this.db){return}
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.getAll();
  
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = ({target}) => {
          reject(`Failed to get all data: ${(target as IDBOpenDBRequest).error}`);
        };
      });
    }
  
    async addItem(item: ChunkInfo) {
      if (!this.db){return};
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], "readwrite");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.add(item);
  
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = ({target}) => {
          reject(`Failed to add item: ${(target as IDBOpenDBRequest).error}`);
        };
      });
    }
  
  }
  

//  export  const db = new DBConnection("test-db", 1, "myStore");
 export  const db = new DBConnection("myDb", 1, "recordings");