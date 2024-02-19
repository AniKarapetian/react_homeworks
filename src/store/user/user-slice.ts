import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types/types";

const initialState: {users: UserData[]}={
    users: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
    addUser(state, action: PayloadAction<UserData>){
        state.users.push(action.payload);
    },
    editUser(state, action: PayloadAction<UserData>){
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[userIndex] = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>){
        const userIndex = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(userIndex,1);
    },

    getUsers(state, action: PayloadAction<UserData[]>){
       state.users = action.payload;
    }
    }
});


export const {addUser, editUser, deleteUser, getUsers} = userSlice.actions;

export default userSlice.reducer;