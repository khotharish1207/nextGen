import { all, call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "../../utils/axios";

// import fs from "fs"

import {
  FETCH_SOCIAL_POSTS,
  fetchSocialPosts,
  ADD_SOCIAL_POSTS,
  setSocialPosts,
  LIKE,
  appendSocialPosts,
  setBusy,
  getToken,
  POST_COMMENT
} from "../actions/actions";

export function* socialPostsHandler({ payload = {} }) {

  console.log("fetchSocialPosts")

  yield put(setBusy(true));
  const { type } = payload;
  if (type === "loadMore") {
    yield put(setBusy(true));
  }
  const {
    posts: { socialPosts },
    app: { accessToken }
  } = yield select((state) => state);
  const page = type === "loadMore" ? socialPosts.page + 1 : socialPosts.page;
  try {

    const config = {
      method: "GET",
      // url: `${SOCIAL_POSTS_URL}post/getpost/bypagesize/feed?sortBy=postTs&page=${page}&size=${socialPosts.size}`,
      url: `/feed/post/feed?byDate=dsc&page=${page}&size=${socialPosts.size}&postType=socialPost`,
      headers: {
        Authorization: accessToken
      },
    };
    const { data } = yield call(axios, config);

    if (type === "loadMore") {
      yield put(appendSocialPosts(data));
      yield put(setBusy(false));
    } else {
      yield put(setSocialPosts(data));
    }

    yield put(setBusy(false));

  } catch (error) {
    yield put(setBusy(false));

    console.error("socialPostsHandler", error);
  }
}

export function* likeHandler({ payload }) {

  yield put(setBusy(true))

  const { id, like } = payload;
  const {
    posts: { socialPosts },
    app: { accessToken, auth }
  } = yield select((state) => state);
  console.log("***likeHandler auth***", auth);

  try {
    if (auth && auth.userId) {
      const config = {
        method: "PUT",
        url: `feed/post/${auth.userId}/${id}/${like ? "like" : "unlike"}`,
        headers: {
          Authorization: accessToken
        },
      };
      console.log("***likeHandler url***", config.url);

      const { data } = yield call(axios, config);
      yield put(setBusy(false))

    }
  } catch (error) {
    yield put(setBusy(false))

  }
}

export function* commentHandler({ payload }) {

  // yield put(getToken())

  const { id, commentContent } = payload;
  const {
    posts: { socialPosts },
    app: { accessToken, auth }
  } = yield select((state) => state);
  console.log("***commentHandler auth***", auth);


  try {
    const config = {
      method: "PUT",
      // url: `feed/post/harish12/${id}/like`,
      url: `feed/post/harish12/${id}/comment?commentContent=${commentContent}`,
      headers: {
        Authorization: accessToken
      },
    };

    const { data } = yield call(axios, config);
    console.log("***commentHandler url***", data);

  } catch (error) {
  }
}

const getImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  // var ref =   firebase.storage().ref().child("image.jpg");
  console.log("in get image")
  return blob;
}

export function* addPostHandler(action) {
  const { payload, DEFERRED: deferred } = action;
  console.log(action)
  const { title, content, postType = "socialPost", uri, mediaType = 'image' } = payload;
  const {
    app: { accessToken, auth }
  } = yield select((state) => state);
  // const [stateId, districtId, cityId] = userLocation.split("_");

  try {
    yield put(setBusy(true));

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: mediaType === "image" ? "image/jpeg" : "video/mp4",
      name: "media"
    });

    console.log("accessToken", accessToken)

    const mediaUploadPayload = {
      method: "POST",
      url: `integration/storage/upload?type=${mediaType}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken,
      },
    }
    const { data: mediaUrl } = yield call(axios, mediaUploadPayload)
    console.log("mediaUrl", mediaUrl)

    // const [stateId, districtId, cityId] = userLocation.split("_");
    const postData = {
      "authorId": auth.userId,
      "authorName": auth.userName,
      "details": content,
      "mediaType": "image",
      mediaUrl,
      "postType": postType,
      "stateId": "5f32b079acea093f33e5f429",
      "cityId": "5f32b078acea093f33e5f427",
      "countryId": "5f32b079acea093f33e5f42a",
      "districtId": "5f32b078acea093f33e5f428"
    };

    const config = {
      method: "POST",
      url: `feed/post/byauthor/${auth.userId}/feed`,
      data: postData,
    };

    const { data } = yield call(axios, config);
    yield put(fetchSocialPosts())

    deferred.resolve()

    yield put(setBusy(false));


  } catch (error) {

    console.log("***addPostHandler error ***", error);

    yield put(setBusy(false));

  }
}

function* watchSaga() {
  yield all([
    takeEvery(FETCH_SOCIAL_POSTS, socialPostsHandler),
    takeLatest(LIKE, likeHandler),
    takeLatest(ADD_SOCIAL_POSTS, addPostHandler),

    takeEvery(POST_COMMENT, commentHandler),
  ]);
}

export default watchSaga();
