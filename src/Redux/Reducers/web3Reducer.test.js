import web3Reducer from './web3Reducer'
import * as actionTypes from '../Actions/web3Actions'

const INITIAL_STATE = {
  web3: {},
  userData: {
    address: '',
    ethBalance: '0',
    currentNetwork: '',
    authenticated: false
  },
  contract: {},
  pendingTransactions: [],
  errorTransaction: '',
  sendingTransactions: false
}

describe('Web3Reducer ', () => {
  it('should return initial state', () => {
    expect(web3Reducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('should store web3 upon login', () => {
    let web3Instance = 'web3Test'
    expect(
      web3Reducer(INITIAL_STATE, { type: actionTypes.SET_WEB3_INSTANCE, payload: web3Instance })
    ).toEqual({
      ...INITIAL_STATE,
      web3: 'web3Test'
    })
  })

  it('should store userData upon login', () => {
    let userData = 'userDataTest'
    expect(
      web3Reducer(INITIAL_STATE, { type: actionTypes.SET_USER_ACCOUNT_DATA, payload: userData })
    ).toEqual({
      ...INITIAL_STATE,
      userData: 'userDataTest'
    })
  })
})
