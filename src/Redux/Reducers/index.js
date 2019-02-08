import { combineReducers } from 'redux'
import Web3Reducer from './web3Reducer'
import delegatesReducer from './delegatesReducer'
import authReducer from './authReducer'

export default combineReducers({
  web3Store: Web3Reducer,
  delegatesStore: delegatesReducer,
  authStore: authReducer
})
