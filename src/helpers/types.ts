export type Listener = {
  id: string;
  cb: Function;
};

export type ListenerInfo = {
  [key: string]: Listener[];
};
