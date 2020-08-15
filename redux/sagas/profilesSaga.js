import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "../../utils/axios";

import { FETCH_PROFILE, setProfile, setBusy } from "../actions/actions";


export function* fetchProfileHandler({ payload }) {
    yield put(setBusy(true));

    try {
        const {
            app: { accessToken, auth }
        } = yield select((state) => state);

        const id = payload.userId ? payload.userId : auth.userId

        const config = {
            method: "GET",
            url: `/users/profile/getUserById?userId=${id}`,
            headers: {
                Authorization: accessToken
            },
        };
        const { data } = yield call(axios, config);
        console.log('fetchProfileHandler', data.values)
        yield put(setProfile(data.values));
        yield put(setBusy(false));

    } catch (error) {
        console.error(error);
        yield put(setBusy(false));

    }
}

function* profileSaga() {
    yield all([takeLatest(FETCH_PROFILE, fetchProfileHandler)]);
}

export default profileSaga()
