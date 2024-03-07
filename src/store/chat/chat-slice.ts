import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/types";

const initialState: IMessage[] = [];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(_, action: PayloadAction<IMessage[]>) {
   return action.payload;
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      state.push(action.payload);
    },
  },
});


export const { setMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;