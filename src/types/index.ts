export type UserData = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  age: number;
  password?: string;
}


export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type LoginData = {
  email: string;
  password: string;
}