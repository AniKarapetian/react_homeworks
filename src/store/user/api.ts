import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "../../types";
const url = 'http://localhost:8080/users';

export default {

  fetchUsers: async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  
  },


  createUser : async (data: UserData)=>{
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data) 
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          return response.json(); 
        })
        .then(data => {
          return data; 
        })
        .catch(error => {
          console.error('Error:', error);
          throw error; 
        });
},

 removeUser: async (id: string)=>{
        return fetch(`${url}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', 
          },
        })
        .catch(error => {
          console.error('Error:', error);
          throw error; 
        });
},

 updateUser: async (data: UserData)=>{
    {
        return fetch(`${url}/${data.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data) 
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          return response.json(); 
        })
        .then(data => {
          return data; 
        })
        .catch(error => {
          console.error('Error:', error);
          throw error; 
        });
      }
}}