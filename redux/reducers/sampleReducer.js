import { ACTION, SET_LOCALE } from "../actions/actions";

const INITIAL_STATE = { name: "react-redux-saga", locale: "en" };

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ACTION:
      return { ...state, ...payload };
    case SET_LOCALE:
      return { ...state, locale: payload };

    default:
      return state;
  }
};

export default reducer;
