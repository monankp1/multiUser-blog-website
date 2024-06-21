import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../api';
import { loginUser, logoutUser, setUsers, addNewUser } from './userSlice';

function* handleLogin(action) {
    const { userName, password } = action.payload;

    try {
        const response = yield call(axios.get, `${BACKEND_ENDPOINT}/users`);
        const users = response.data;
        const user = users.find((u) => u.userName === userName && u.password === password);
        if (user) {
            localStorage.setItem('user', JSON.stringify({ userName: user.userName, role: user.role }));
            yield put(loginUser(user));
        } else {
            console.error('Login failed. Please try again.');
        }
    } catch (error) {
        console.error(error);
    }
}

function* handleLogout() {
    localStorage.removeItem('user');
    yield put(logoutUser());
}

function* fetchUsers() {
    try {
        const response = yield call(axios.get, `${BACKEND_ENDPOINT}/users`);
        yield put(setUsers(response.data));
    } catch (error) {
        console.error(error);
    }
}

function* addUser(action) {
    try {
        const response = yield call(axios.post, `${BACKEND_ENDPOINT}/users`, action.payload);
        yield put(addNewUser(response.data));
    } catch (error) {
        console.error(error);
    }
}

export function* watchUserActions() {
    yield takeEvery('user_login', handleLogin);
    yield takeEvery('user_logout', handleLogout);
    yield takeEvery('user_fetchUsers', fetchUsers);
    yield takeEvery('user_addUser', addUser);
}
