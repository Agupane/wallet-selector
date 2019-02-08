import * as actionTypes from './delegatesActionsTypes'

export const fetchDelegatesSuccess = delegates => {
  return {
    type: actionTypes.FETCH_DELEGATES_SUCCESS,
    payload: delegates
  }
}

export const fetchDelegatesFail = error => {
  return {
    payload: actionTypes.FETCH_DELEGATES_FAIL,
    error: error
  }
}

export const fetchDelegatesStart = () => {
  return {
    type: actionTypes.FETCH_DELEGATES_INIT
  }
}

export const fetchDelegates = () => {
  return dispatch => {
    dispatch(fetchDelegatesStart())
    /** Here we should call API with axios **/
    try {
      // let delegates = await axios.get('/delegates')
      /** example: ** - TODO DELETE **/
      setTimeout(() => {
        console.log('Fetching of delegates finished')
        let delegates = [
          {
            address: '123',
            delegateAddress: '123',
            stakedLPT: '100000'
          },
          {
            address: '456',
            delegateAddress: '456',
            stakedLPT: '1'
          }
        ]
        dispatch(fetchDelegatesSuccess(delegates))
      }, 1000)
    } catch (err) {
      dispatch(fetchDelegatesFail(err))
    }
  }
}
