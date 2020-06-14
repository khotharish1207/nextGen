import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Image } from 'react-native';

import {
  setCategories,
  setServiceLocations,
  FETCH_CATEGORIES,
  FETCH_SERVICE_LOCATIONS,
} from '../actions/actions';
import { base_url, SOCIAL_POSTS_URL } from './constants';

export function* handler() {
  try {
    const config = {
      method: 'GET',
      url: `${base_url}/categories`,
    };
    const { data } = yield call(axios, config);
    yield put(setCategories(data));
  } catch (error) {
    console.error(error);
  }
}

export function* serviceLocationHandler() {
  try {
    const config = {
      method: 'GET',
      url: `${SOCIAL_POSTS_URL}common/service-available/feed`,
    };
    const { data } = yield call(axios, config);

    console.log(`serviceLocationHandler**`, Object.keys(data.data), data);

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
