import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


function createUserThunk(type,url,method="post") {
    
   return createAsyncThunk(`user/${type}`, async(data, thunkAPI) => {

        try{
            const response = await axios[method](`${url}`,data)

            if (response.data.status < 200 || response.data.status >= 300) {
                return thunkAPI.rejectWithValue(response.data);
              }

            return response.data
        }
        catch(err){
           
            return thunkAPI.rejectWithValue(
                err.response?.data || { error: 'An unknown error occurred' }
              );
        }
    })
}

function createUserProfileThunk(type,url,method="post") {
    
    return createAsyncThunk(`user/${type}`, async(username, thunkAPI) => {
        console.log("thunk username",username)
 
         try{
             const response = await axios[method](`${url}${username}`)
 
             if (response.data.status < 200 || response.data.status >= 300) {
                 return thunkAPI.rejectWithValue(response.data);
               }
 
             return response.data
         }
         catch(err){
            
             return thunkAPI.rejectWithValue(
                 err.response?.data || { error: 'An unknown error occurred' }
               );
         }
     })
 }

const url = 'http://localhost:8000/' 
export const registerUser = createUserThunk('register',`${url}auth/register`);
export const loginUser = createUserThunk('login',`${url}auth/login`);
export const editProfile = createUserThunk('editProfile');
export const fetchProfile = createUserProfileThunk('fetchProfile',`${url}auth/profile/:`,'get');
export const logoutUser = createUserThunk('logoutUser');


