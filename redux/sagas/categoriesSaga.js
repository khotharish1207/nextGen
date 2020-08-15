import { all, call, put, select, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
import axios from '../../utils/axios';

import {
  setCategories,
  setServiceLocations,
  getToken,
  FETCH_CATEGORIES,
  FETCH_SERVICE_LOCATIONS,
} from '../actions/actions';
import { base_url, SOCIAL_POSTS_URL } from './constants';

export function* handler() {

  try {
    // yield put(getToken())
    const {
      app: { accessToken }
    } = yield select((state) => state);
    const config = {
      method: 'GET',
      url: `/integration/category/getAll`,
      headers: {
        Authorization: accessToken
      },
    };
    const { data } = yield call(axios, config);
    yield put(setCategories(data));
  } catch (error) {
    console.error('FETCH_CATEGORIES', error);
  }
}

export function* serviceLocationHandler() {
  try {
    // yield put(getToken())
    const {
      app: { accessToken }
    } = yield select((state) => state);
    const config = {
      method: 'GET',
      url: `feed/country/state/city`,
      headers: {
        Authorization: accessToken
      },
    };
    const { data } = yield call(axios, config);
    console.log('serviceLocationHandler', JSON.stringify(data))


    if (data.data && data.data.availableLocation) {
      yield put(setServiceLocations(data.data.availableLocation));
    }
  } catch (error) {
    console.error(error);
  }
}

function* watch() {
  yield all([
    takeLatest(FETCH_CATEGORIES, handler),
    takeLatest(FETCH_SERVICE_LOCATIONS, serviceLocationHandler),
  ]);
}

export default watch();
