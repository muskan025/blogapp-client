import { createSlice } from "@reduxjs/toolkit";
 
 
const userSlice = createSlice({
    name:'user', 
    initialState:{
      author:null,
      isAuth:false
     },
    reducers:{
      setUser: (state,action)=>{
        state.author = action.payload
        state.isAuth = true
      },
      clearUser: (state)=>{
        state.author = null
        state.isAuth = false
      }
    }
})

export const {setUser,clearUser } = userSlice.actions
export default userSlice.reducer;

 