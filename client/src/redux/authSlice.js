import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    posts: [],
    users: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: state => {
            state.user = null;
            state.token = null;
        },
        setFollowers: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends non-existent :(');
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setLogin, setLogout, setFollowers, setPosts, setPost, setUsers } = authSlice.actions;
export default authSlice.reducer;
