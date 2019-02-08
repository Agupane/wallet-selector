import * as actionTypes from '../Actions/ActionTypes/authActionsTypes'
import { updateObject } from '../../Utils/reduxUtilitys'

const INITIAL_STATE = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return updateObject(state, {
        error: null,
        loading: true
      })
    }
    case actionTypes.AUTH_SUCCESS: {
      return updateObject(state, {
        error: null,
        loading: false,
        token: action.payload.idToken,
        userId: action.payload.userId
      })
    }
    case actionTypes.AUTH_FAIL: {
      return updateObject(state, {
        error: action.payload,
        loading: false
      })
    }
    case actionTypes.AUTH_LOGOUT: {
      return updateObject(state, {
        error: null,
        loading: false,
        token: null,
        userId: null
      })
    }
    default: {
      return state
    }
  }
}

export default reducer
