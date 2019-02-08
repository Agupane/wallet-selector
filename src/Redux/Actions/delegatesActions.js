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

export const fetchDelegates = token => {
  return async dispatch => {
    dispatch(fetchDelegatesStart())
    /** Here we should call API with axios **/
    try {
      /** TODO -- Delete auth token once tested, not needed on the app **/
      if (token) {
        console.log('Fetching delegates with token ', token)
        let delegates = await axios.get('/delegates.json?auth=' + token)
        dispatch(fetchDelegatesSuccess(delegates.data))
      }
    } catch (err) {
      dispatch(fetchDelegatesFail(err))
    }
  }
}
