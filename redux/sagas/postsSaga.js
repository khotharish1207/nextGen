import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  FETCH_SOCIAL_POSTS,
  ADD_SOCIAL_POSTS,
  setSocialPosts,
  LIKE,
  appendSocialPosts,
  setBusy,
} from '../actions/actions';
import { SOCIAL_POSTS_URL, URL } from './constants';

export function* socialPostsHandler({ payload = {} }) {
  const { type } = payload;
  if (type === 'loadMore') {
    yield put(setBusy(true));
  }
  const {
    posts: { socialPosts },
  } = yield select((state) => state);
  const page = type === 'loadMore' ? socialPosts.page + 1 : socialPosts.page;
  try {
    const config = {
      method: 'GET',
      url: `${SOCIAL_POSTS_URL}post/getpost/bypagesize/feed?sortBy=postTs&page=${page}&size=${socialPosts.size}`,
    };
    const { data } = yield call(axios, config);

    if (type === 'loadMore') {
      yield put(appendSocialPosts(data));
      yield put(setBusy(false));
    } else {
      yield put(setSocialPosts(data));
    }
  } catch (error) {
    console.log('***socialPostsHandler error ***');

    console.error(error);
  }
}

export function* likeHandler({ payload }) {
  const { postObjType, postId, author } = payload;
  const { auth } = yield select((state) => state.app);

  try {
    const config = {
      method: 'GET',
      url: `${URL}feed/do/like/${postObjType}/${postId}/of/${author}/?uid=${auth.user.id}`,
    };
    console.log('***likeHandler url***', config.url);

    const { data } = yield call(axios, config);
    console.log('***likeHandler datax***', data);
  } catch (error) {
    console.log('***likeHandler error ***', error);
  }
}

export function* addPostHandler({ payload }) {
  const { title, content, url } = payload;
  const { auth, userLocation } = yield select((state) => state.app);
  const [stateId, districtId, cityId] = userLocation.split('_');
  const postData = {
    stateId,
    districtId,
    cityId,
    title,
    content,
    url,
    objectId: 1,
  };

  try {
    const config = {
      method: 'POST',
      url: `${URL}feed/post/byauthor/${auth.user.id}/feed`,
      data: postData,
    };
    console.log('***likeHandler url***', config.url);

    //   const { data } = yield call(axios, config);
    //   console.log('***likeHandler datax***', data);
  } catch (error) {
    console.log('***likeHandler error ***', error);
  }
}

function* watchSaga() {
  yield all([
    takeLatest(FETCH_SOCIAL_POSTS, socialPostsHandler),
    takeEvery(LIKE, likeHandler),
    takeLatest(ADD_SOCIAL_POSTS, addPostHandler),
  ]);
}

export default watchSaga();
