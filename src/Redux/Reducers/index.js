import { combineReducers } from 'redux'
import Web3Reducer from './web3Reducer'
import delegatesReducer from './delegatesReducer'

export default combineReducers({
  web3Store: Web3Reducer,
  delegatesStore: delegatesReducer
})
