import * as actionTypes from './ActionTypes/delegatesActionsTypes'
import axios from '../../Utils/axios/axios-backend'

export const fetchDelegatesSuccess = delegates => {
  return {
    type: actionTypes.FETCH_DELEGATES_SUCCESS,
    payload: delegates
  }
}

export const fetchDelegatesFail = error => {
  return {
    type: actionTypes.FETCH_DELEGATES_FAIL,
    payload: error
  }
}

export const fetchDelegatesStart = () => {
  return {
    type: actionTypes.FETCH_DELEGATES_INIT
  }
}

export const fetchDelegates = () => {
  return async dispatch => {
    dispatch(fetchDelegatesStart())
    /** Here we should call API with axios **/
    try {
      let delegates = await axios.get('/delegates.json')
      console.log('result aaaaa ', delegates)
      dispatch(fetchDelegatesSuccess(delegates))
    } catch (err) {
      dispatch(fetchDelegatesFail(err))
    }
  }
}
