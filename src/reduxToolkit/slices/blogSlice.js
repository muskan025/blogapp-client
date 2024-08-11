import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:'blog',
    initialState:{
        myBlogs:null,
        allBlogs:null
    },
    reducers:{
        setMyBlogs:(state,action)=>{
            state.myBlogs = action.payload
        },
        setAllBlogs:(state,action)=>{
            state.allBlogs = action.payload
        },
    }
})


export const {setMyBlogs,setAllBlogs} = blogSlice.actions

export default blogSlice.reducer

