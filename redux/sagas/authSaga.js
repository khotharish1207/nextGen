import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';

import {
  LOGOUT, LOGIN, setUser, setBusy, GET_TOKEN, setAccessToken,
  ACTION, fetchCategories, fetchServiceLocations, fetchSocialPosts
} from '../actions/actions';
import { SOCIAL_POSTS_URL } from './constants';
import Base64, { retrieveAsyncData, storeAsyncData, removeAsyncData } from '../../utils';
import { addAccessToken } from '../../utils/axios'

const AUTH_KEY = '@next_gen_app_auth_key';

export function* loginHandler({ payload, DEFERRED: deferred }) {
  yield put(setBusy(true));
  console.log('loginHandler')

  try {
    const { userId, password } = payload
    const config = {
      method: 'POST',
      url: `users/profile/signin`,
      data: {
        userId, password
      }
    };
    const { data } = yield call(axios, config);
    console.log(data.values)
    storeAsyncData(AUTH_KEY, data.values);
    yield put(setUser({ ...data.values }));
    yield put(setBusy(false));
    deferred.resolve()
  } catch (error) {
    console.log('', error.message)
    deferred.reject(error)
    yield put(setBusy(false));
  }
}

export function* logoutHandler() {

  try {
    yield removeAsyncData(AUTH_KEY)
    yield put(setUser({}));


  } catch (error) {
    // yield put(setBusy(false));
  }
}

export function* initHandler() {

  try {
    const a = yield retrieveAsyncData(AUTH_KEY)
    console.log('initHandler', a)
    yield put(setUser(a));
    yield tokenHandler()

    yield put(fetchSocialPosts())
    yield put(fetchCategories())
    yield put(fetchServiceLocations())


  } catch (error) {
    // yield put(setBusy(false));
  }
}


export function* tokenHandler() {
  yield put(setBusy(true));

  try {
    const config = {
      method: 'POST',
      url: `/security/oauth/token?grant_type=client_credentials`,
      headers: {
        Authorization: `Basic ${Base64.btoa('test6:secret')}`
      },
    };
    const { data } = yield call(axios, config);
    const token = `${data.token_type} ${data.access_token}`
    yield put(setAccessToken(token));
    yield addAccessToken(token)
    yield put(setBusy(false));
  } catch (error) {
    yield put(setBusy(false));
  }
}

function* watchSaga() {
  yield all([
    takeLatest(LOGIN, loginHandler),
    takeLatest(LOGOUT, logoutHandler),
    takeLatest(GET_TOKEN, tokenHandler),
    takeLatest(ACTION, initHandler)
  ]);
  // yield all([takeLatest(LOGOUT, logoutHandler)]);
  // yield all([takeLatest(GET_TOKEN, tokenHandler)]);
  // yield all([takeLatest(ACTION, initHandler)]);
}

export default watchSaga();
