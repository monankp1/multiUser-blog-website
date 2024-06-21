import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../api';
import { setBlogs, addNewBlog, updateBlogInState, deleteBlogInState } from './blogSlice';

function* fetchBlogs() {
    try {
        const response = yield call(axios.get, `${BACKEND_ENDPOINT}/blogs`);
        yield put(setBlogs(response.data));
    } catch (error) {
        console.error(error);
    }
}

function* addBlog(action) {
    try {
        const response = yield call(axios.post, `${BACKEND_ENDPOINT}/blogs`, action.payload);
        yield put(addNewBlog(response.data));
    } catch (error) {
        console.error(error);
    }
}

function* updateBlog(action) {
    try {
        const { blog } = action.payload;
        const response = yield call(axios.put, `${BACKEND_ENDPOINT}/blogs/${blog.id}`, blog);
        yield put(updateBlogInState(response.data));
    } catch (error) {
        console.error(error);
    }
}

function* deleteBlog(action) {
    try {
        const { blogId } = action.payload;
        yield call(axios.delete, `${BACKEND_ENDPOINT}/blogs/${blogId}`);
        yield put(deleteBlogInState({ blogId }));
    } catch (error) {
        console.error(error);
    }
}

export function* watchBlogActions() {
    yield takeEvery('blog_fetchBlogs', fetchBlogs);
    yield takeEvery('blog_addBlog', addBlog);
    yield takeEvery('blog_updateBlog', updateBlog);
    yield takeEvery('blog_deleteBlog', deleteBlog);
}
