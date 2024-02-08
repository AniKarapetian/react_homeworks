import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todo/todo-slice';
import loginReducer from './login/login-slice';
import userReducer from './user/user-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './type';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    login: loginReducer,
    users: userReducer,
  },
});

export default store;


export const useAppDispatch: () => AppDispatch = useDispatch;
