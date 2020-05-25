import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_SOCIAL_POSTS, setSocialPosts } from '../actions/actions';
import { SOCIAL_POSTS_URL } from './constants';

export function* socialPostsHandler() {
  try {
    const config = {
      method: 'GET',
      url: `${SOCIAL_POSTS_URL}post/getpost/bypagesize/feed?sortBy=postTs&page=1&size=10`,
    };
    const { data } = yield call(axios, config);
    // console.log('***socialPostsHandler***', data);
    yield put(setSocialPosts(data))
  } catch (error) {
    console.log('***socialPostsHandler error ***');

    console.error(error);
  }
}

function* watchSaga() {
  yield all([takeLatest(FETCH_SOCIAL_POSTS, socialPostsHandler)]);
}

export default watchSaga();
