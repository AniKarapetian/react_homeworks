import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginData } from '../../types';


const initialState: {isLoggedIn:boolean} = {isLoggedIn: false};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
     login(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      },
   
   
  },
});

export const { login } = loginSlice.actions;


export default loginSlice.reducer;