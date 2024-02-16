import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todo/todo-slice';
import loginReducer from './login/login-slice';
import userReducer from './user/user-slice';
import weatherReducer from './weather/weather-slice';
import sharedReducer from './shared/shared-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './type';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    login: loginReducer,
    users: userReducer,
    weather: weatherReducer,
    shared: sharedReducer,
  },
});

export default store;


export const useAppDispatch: () => AppDispatch = useDispatch;