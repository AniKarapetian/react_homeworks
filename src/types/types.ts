import { ReactNode } from "react";

export type UserData = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  age: number;
  password?: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RouteType = {
  name: string;
  path: string;
  type: string;
  Component: React.FC;
};

export type ChunkInfo = {
  chunkId: number;
  data: Blob;
};

export type ItemType<T> = {
  item: T;
};

export interface IMessage {
  text: string;
  date: number;
  sender: {
    id: string;
    name: string;
    lastname: string;
  };
  receiver: {
    id: string;
    name: string;
    lastname: string;
  };
}

export type AskMessageModel = {
  userId: string;
  i: number;
  j: number;
};

export type AnswerMessageModel = {
  userId: string;
  answerType: string;
  i: number;
  j: number;
};
