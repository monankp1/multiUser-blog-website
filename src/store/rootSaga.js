import { all } from 'redux-saga/effects';
import { watchUserActions } from './userSagas';
import { watchBlogActions } from './blogSagas';

export default function* rootSaga() {
    yield all([
        watchUserActions(),
        watchBlogActions(),
    ]);
}
