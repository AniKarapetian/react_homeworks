import { RootState } from '../type';

export const loginSelector = (state: RootState) => state.login.isLoggedIn;

