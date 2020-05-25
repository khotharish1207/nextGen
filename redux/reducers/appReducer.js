import { SET_CATEGORIES } from '../actions/actions';

const INITIAL_STATE = {
  categories: [],
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: [...payload] };

    default:
      return state;
  }
};

export default reducer;
