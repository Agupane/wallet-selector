import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../Reducers/index'
import logdown from 'logdown'
import thunk from 'redux-thunk'

/** Enables redux dev tools on chrome **/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const logger = logdown('WalletSelector:StoreMiddleware')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

/** TODO -- Enable when needed **/
/*
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);
*/

const loggerMiddleware = store => {
  return next => {
    return action => {
      logger.log('Dispatching', action)
      const result = next(action)
      logger.log('Next state', store.getState())
      return result
    }
  }
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(loggerMiddleware, thunk))
)
