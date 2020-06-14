import { createAction } from 'redux-actions';

export const ACTION = 'ACTION';
export const action = createAction(ACTION);

export const SAGA_ACTION = 'SAGA_ACTION';
export const sagaAction = createAction(SAGA_ACTION);

export const SET_LOCALE = 'SET_LOCALE';
export const setLocale = createAction(SET_LOCALE);

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const SET_USER = 'SET_USER';
export const setUser = createAction(SET_USER);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);

export const LIKE = 'LIKE';
export const like = createAction(LIKE);

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const fetchCategories = createAction(FETCH_CATEGORIES);

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const setCategories = createAction(SET_CATEGORIES);

export const FETCH_SERVICE_LOCATIONS = 'FETCH_SERVICE_LOCATIONS';
export const fetchServiceLocations = createAction(FETCH_SERVICE_LOCATIONS);

export const SET_SERVICE_LOCATIONS = 'SET_SERVICE_LOCATIONS';
export const setServiceLocations = createAction(SET_SERVICE_LOCATIONS);

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = createAction(FETCH_POSTS);

export const FETCH_SOCIAL_POSTS = 'FETCH_SOCIAL_POSTS';
export const fetchSocialPosts = createAction(FETCH_SOCIAL_POSTS);

export const SET_SOCIAL_POSTS = 'SET_SOCIAL_POSTS';
export const setSocialPosts = createAction(SET_SOCIAL_POSTS);

export const APPEND_SOCIAL_POSTS = 'APPEND_SOCIAL_POSTS';
export const appendSocialPosts = createAction(APPEND_SOCIAL_POSTS);
