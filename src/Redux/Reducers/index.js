import { combineReducers } from 'redux'
import Web3Reducer from './web3Reducer'
import delegatesReducer from './delegatesReducer'
import uiReducer from './uiReducer'
export default combineReducers({
  web3Store: Web3Reducer,
  delegatesStore: delegatesReducer,
  uiStore: uiReducer
})
