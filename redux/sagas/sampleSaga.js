import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { SAGA_ACTION, action } from "../actions/actions";
import { port } from "../helper";

export function* handler() {
  try {
    const config = {
      method: "GET",
      url: `http://localhost:${port}/`
    };
    const { data } = yield call(axios, config);
    yield put(action(data));
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(SAGA_ACTION, handler)]);
}
