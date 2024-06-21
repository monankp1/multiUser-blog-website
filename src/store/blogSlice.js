import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        addNewBlog: (state, action) => {
            state.blogs.push(action.payload);
        },
        updateBlogInState: (state, action) => {
            const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
        },
        deleteBlogInState: (state, action) => {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        },
    }
});

export const { setBlogs, addNewBlog, updateBlogInState, deleteBlogInState } = blogSlice.actions;

export default blogSlice.reducer;
