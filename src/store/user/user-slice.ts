import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types";

const initialState: UserData[]=[];
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
    addUser(state, action: PayloadAction<UserData>){
        state.push(action.payload);
    },
    editUser(state, action: PayloadAction<UserData>){
        const userIndex = state.findIndex((user) => user.id === action.payload.id);
        state[userIndex] = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>){
       return  state.filter((user)=>user.id !==action.payload);
    },

    getUsers(_, action: PayloadAction<UserData[]>){
        return action.payload;
    }
    }
});


export const {addUser, editUser, deleteUser, getUsers} = userSlice.actions;

export default userSlice.reducer;