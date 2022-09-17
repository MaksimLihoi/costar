import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducers';
import { watcherSaga } from './saga/watcher/watcherSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducers,
  compose(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(watcherSaga);
export default store;
