import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Image } from 'react-native';

import { setCategories, FETCH_CATEGORIES } from '../actions/actions';
import { base_url } from './constants';

export function* handler() {
  try {
    const config = {
      method: 'GET',
      url: `${base_url}/categories`,
    };
    const { data } = yield call(axios, config);

    // data.map(({ image }) => Image.prefetch(image));

    yield put(setCategories(data));
  } catch (error) {
    console.error(error);
  }
}

function* watch() {
  yield all([takeLatest(FETCH_CATEGORIES, handler)]);
}

export default watch();
