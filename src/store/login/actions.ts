import store from "..";
import { UserData } from "../../types";
import api from "../user/api";
import { login } from "./login-slice";

const url = 'http://localhost:8080/users';
export const signIn = async (data: any)=>{
    const users = await api.fetchUsers();

    const account = users.find((user: UserData)=>user.email === data.email && user.password === data.password);
   if(account){

       store.dispatch(login(true));
   } else {
    return "User not found";
   }
}

export const signOut = ()=>{
    store.dispatch(login(false));
}

