import { SET_CATEGORIES, SET_USER, LOGOUT, SET_SERVICE_LOCATIONS } from '../actions/actions';

const INITIAL_STATE = {
  categories: [],
  auth: {},
  serviceLocations: [],
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: [...payload] };
    case SET_USER:
      return { ...state, auth: { ...payload } };
    case SET_SERVICE_LOCATIONS:
      return { ...state, serviceLocations: payload };
    case LOGOUT:
      return { ...state, auth: {} };

    default:
      return state;
  }
};

export default reducer;
