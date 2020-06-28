import {
  SET_CATEGORIES,
  SET_USER,
  LOGOUT,
  SET_SERVICE_LOCATIONS,
  SET_BUSY,
} from '../actions/actions';

const INITIAL_STATE = {
  categories: [],
  auth: {},
  serviceLocations: [],
  userLocation: '27_1_1',
  showBusyScreen: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: [...payload] };
    case SET_USER:
      return { ...state, auth: { ...payload } };
    case SET_BUSY:
      return { ...state, showBusyScreen: payload };
    case SET_SERVICE_LOCATIONS:
      return { ...state, serviceLocations: payload };
    case LOGOUT:
      return { ...state, auth: {} };

    default:
      return state;
  }
};

export default reducer;
