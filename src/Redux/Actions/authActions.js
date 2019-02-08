import * as actionTypes from './ActionTypes/authActionsTypes'
import axios from '../../Utils/axios/axios-auth'
const signInUrl = process.env.REACT_APP_API_SIGNIN_URL
const signUpUrl = process.env.REACT_APP_API_SIGNUP_URL
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      idToken: token,
      userId: userId
    }
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  if (!expirationTime) {
    return
  }
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      const userId = localStorage.getItem('userId')
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()))
      } else {
        dispatch(logout())
      }
    }
  }
}

export const auth = (email, password, isSignUp) => {
  if (!email || !password) {
    return
  }
  return async dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    try {
      let url = signUpUrl + apiKey
      if (!isSignUp) {
        url = signInUrl + apiKey
      }
      let response = await axios.post(url, authData)
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
      dispatch(authFail(error))
    }
  }
}
