import { RootState } from '../type';

export const loginSelector = (state: RootState) => state.login.isLoggedIn;
export const userSelector = (state: RootState) => state.login.user;


