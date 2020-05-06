import { ACTION, SET_LOCALE } from '../actions/actions';

const INITIAL_STATE = [
  {
    // id: '5e9476cced75a703c8f1203b',
    name: 'Newsfeed',
    imgUrl: 'http://148.72.64.33:8080/api/publish/category/fetchImage/Health.jpg',
  },
  {
    // id: '5e9476cced75a703c8f1203b',
    name: 'Top stories',
    imgUrl: 'http://148.72.64.33:8080/api/publish/category/fetchImage/Health.jpg',
  },
  {
    // id: '5e9476cced75a703c8f1203b',
    name: 'Near you',
    imgUrl: 'http://148.72.64.33:8080/api/publish/category/fetchImage/Health.jpg',
  },
  {
    // id: '5e9476cced75a703c8f1203b',
    name: 'Trending',
    imgUrl: 'http://148.72.64.33:8080/api/publish/category/fetchImage/Health.jpg',
  },
];

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case SET_CATEGORIES:
      return [...payload];

    default:
      return state;
  }
};

export default reducer;
