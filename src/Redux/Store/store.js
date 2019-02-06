import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../Reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/** TODO -- Enable when needed **/
/*
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);
*/
export const store = createStore(rootReducer)
