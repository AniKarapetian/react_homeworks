import { UserData } from "../../types/types";
import api from "./api";
import { addUser, deleteUser, editUser, getUsers } from "./user-slice";
import store from "..";


export const fetchUsers = async ()=>{
  const res = await api.fetchUsers();
  store.dispatch(getUsers(res));
}


export const createUser = async (data: UserData)=>{
  const res = await api.createUser({...data, id: `${Date.now()}`});
  store.dispatch(addUser(res));
 
};

export const removeUser = async (id: string)=>{
  await api.removeUser(id);
  store.dispatch(deleteUser(id));
};

export const updateUser = async (data: UserData)=>{
  const res = await api.updateUser(data);
  store.dispatch(editUser(res));
};