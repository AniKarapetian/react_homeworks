import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types';


const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
        state.push({ id: Date.now(), userId: 1, title: action.payload, completed: false } );
      },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setTodos(_, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export const { addTodo, toggleTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;


