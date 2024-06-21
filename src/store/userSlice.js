import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userRole: '',
    userName: '',
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.userRole = action.payload.role;
            state.userName = action.payload.userName;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userRole = '';
            state.userName = '';
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addNewUser: (state, action) => {
            state.users.push(action.payload);
        },
    }
});

export const { loginUser, logoutUser, setUsers, addNewUser } = userSlice.actions;

export default userSlice.reducer;
