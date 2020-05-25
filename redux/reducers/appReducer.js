import { SET_CATEGORIES, SET_USER, LOGOUT } from '../actions/actions';

const INITIAL_STATE = {
  categories: [],
  auth: {},
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: [...payload] };
    case SET_USER:
      return { ...state, auth: { ...payload } };
    case LOGOUT:
      return { ...state, auth: {} };

    default:
      return state;
  }
};

export default reducer;
