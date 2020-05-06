export const port = 8001;

export const API_INITIAL_STATE = {
  isLoading: false,
  error: null,
  result: null
};

export const defaultHandler = (state, payload) => ({ ...state, ...payload });
