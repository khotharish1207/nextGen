import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers/rootReducer';
import saga from './sagas/rootSaga';
import promiseMiddleare from './middlewares'

const sagaMiddleware = createSagaMiddleware();



export default function (initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, promiseMiddleare))
  );
  sagaMiddleware.run(saga);

  return store;
}
