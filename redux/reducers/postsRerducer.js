import { SET_SOCIAL_POSTS, APPEND_SOCIAL_POSTS } from '../actions/actions';
import { imageUrls } from '../../constants/Images';

const INITIAL_STATE = { socialPosts: { size: 5, page: 1, data: [] } };

const reducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case SET_SOCIAL_POSTS:
      if (payload && payload.data && payload.data.postDtl) {
        const d = payload.data.postDtl.map((el) => {
          if (el.postImgUrl === 'dummy') el.postImgUrl = imageUrls[Math.floor(Math.random() * 100)];
          return el;
        });

        return { ...state, socialPosts: { ...state.socialPosts, data: d, page: 1 } };
      }
      return { ...state };

    case APPEND_SOCIAL_POSTS:
      if (payload && payload.data && payload.data.postDtl)
        return {
          ...state,
          socialPosts: {
            ...state.socialPosts,
            data: [...state.socialPosts.data, ...payload.data.postDtl],
            page: state.socialPosts.page + 1,
          },
        };
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
