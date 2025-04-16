import { createSlice, CreateSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    mode: "light",
    user: null,
    profile: null,
    token: null,
    post:[]
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.profile = action.payload.user;
            state.token = action.payload.user;
        },
        setLogout:(state)=>{
            state.user = null;
            state.profile = null;
            state.token = null;
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends non existent :<")
            };
        },
        setProfile:(state,action)=>{
            state.profile = action.payload.profile;
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatePosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatePosts;
        },


    }
});

export const { setMode,setLogin,setLogout,setFriends,setProfile,setPost,setPosts} = authSlice.actions;
export default authSlice.reducer;