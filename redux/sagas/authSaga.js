import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOGOUT, LOGIN, setUser, setBusy } from '../actions/actions';
import { SOCIAL_POSTS_URL } from './constants';

export function* loginHandler() {
  yield put(setBusy(true));

  try {
    const config = {
      method: 'GET',
      url: `${SOCIAL_POSTS_URL}login/IdTest49989@gmail.com/IdTest49989`,
    };
    const { data } = yield call(axios, config);
    // console.log(`...loginHandler...`, data.data);
    yield put(setUser({ ...data.data }));
    yield put(setBusy(false));
  } catch (error) {
    console.log(`...loginHandler...`, error);
    yield put(setBusy(false));
  }
}

function* watchSaga() {
  yield all([takeLatest(LOGIN, loginHandler)]);
}

export default watchSaga();
