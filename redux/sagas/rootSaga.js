import { all } from "redux-saga/effects";

/**
 * Import custom sagas
 */
import sampleSaga from "./sampleSaga";
import categories from "./categoriesSaga"
import postsSaga from './postsSaga'

/**
 * rootSaga
 */
export default function* () {
  yield all([sampleSaga(), categories, postsSaga]);
}
