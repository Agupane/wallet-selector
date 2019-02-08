import * as actionTypes from '../Actions/ActionTypes/delegatesActionsTypes'
import { updateObject } from '../../Utils/reduxUtilitys'

const INITIAL_STATE = {
  delegates: [
    {
      address: '',
      delegateAddress: '',
      stakedLPT: ''
    }
  ],
  loadingDelegates: false
}

const delegatesReducer = (state = INITIAL_STATE, action) => {
  if (!action) {
    return state
  }
  switch (action.type) {
    case actionTypes.FETCH_DELEGATES_INIT: {
      return updateObject(state, {
        loadingDelegates: true
      })
    }
    case actionTypes.FETCH_DELEGATES_SUCCESS: {
      if (!action.payload) {
        updateObject(state, {
          loadingDelegates: false
        })
      }
      return updateObject(state, {
        delegates: action.payload,
        loadingDelegates: false
      })
    }
    case actionTypes.FETCH_DELEGATES_FAIL: {
      return updateObject(state, {
        loadingDelegates: false
      })
    }
    default: {
      return state
    }
  }
}

export default delegatesReducer
