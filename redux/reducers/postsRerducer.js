import { SET_SOCIAL_POSTS, APPEND_SOCIAL_POSTS } from '../actions/actions';

const INITIAL_STATE = { socialPosts: { size: 10, page: 1, data: [] } };

const reducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  console.log(`******---reducer*`, payload);
  //   const {
  //     data: { postDtl = [] },
  //   } = payload || {};
  switch (type) {
    case SET_SOCIAL_POSTS:
      if (payload && payload.data && payload.data.postDtl)
        return { ...state, socialPosts: { ...state.socialPosts, data: payload.data.postDtl } };
      return { ...state };

    case APPEND_SOCIAL_POSTS:
      if (payload && payload.data && payload.data.postDtl)
        return {
          ...state,
          socialPosts: { ...state.socialPosts, data: [...state.socialPosts.data, ...postDtl] },
        };
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
