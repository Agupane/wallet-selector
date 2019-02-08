import { combineReducers } from 'redux'
import Web3Reducer from './web3Reducer'

export default combineReducers({
  web3Store: Web3Reducer
})
