import { setTodos } from "../../store/todo/todo-slice";
import { AppThunk } from "../../store/type";
import { Todo } from "../../types/types";

export const fetchTodos = (): AppThunk => async (dispatch) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos: Todo[] = await response.json();
      dispatch(setTodos(todos));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };