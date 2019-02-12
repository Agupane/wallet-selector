import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../Reducers/index'
import logdown from 'logdown'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { loadState, saveState } from '../../Utils/reduxUtilitys'
const logger = logdown('WalletSelector:StoreMiddleware')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const configureStore = () => {
  /** Enables redux dev tools on chrome **/
  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose

  const loggerMiddleware = store => {
    return next => {
      return action => {
        logger.log('Dispatching', action)
        const result = next(action)
        //logger.log('Next state', store.getState())
        return result
      }
    }
  }

  const persistedState = loadState()
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(loggerMiddleware, thunk))
  )

  store.subscribe(
    throttle(() => {
      saveState(store.getState())
    }),
    1000
  )

  console.log('store ', store)
  return store
}

export default configureStore
