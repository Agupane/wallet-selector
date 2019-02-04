import Web3 from 'web3'
import logdown from 'logdown'
import * as failReasons from './Web3FailReasons'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const metamaskProvider = {
  connect: async () => {
    console.log('Connected')
    let web3Instance
    try {
      /** We get web3 instance **/
      web3Instance = await loadWeb3()
      console.log('web3 instance ', web3Instance)
      /** TODO - Once we got the web3 instance we need to get the user data **/
    } catch (error) {
      console.log(error)
    }
  }
}

const loadWeb3 = async () => {
  const { ethereum, web3 } = window
  logger.log('Loading web3')
  /** We check which web3 version is injected by the wallet, either the new version or the legacy one **/
  if (ethereum) {
    logger.log('User has new web3')
    return loadWeb3LastVersion()
  } else if (web3) {
    logger.log('User has legacy web3')
    return loadWeb3Legacy()
  } else {
    /** The user does not have web3 **/
    logger.log('User does not have web3')
    throw new Error('User does not have web3')
  }
}

const loadWeb3LastVersion = async () => {
  logger.log('Getting web3 new instance')
  let web3Instance
  const { ethereum } = window
  web3Instance = new Web3(ethereum)
  try {
    /** Request access to the user **/
    logger.log('Requesting user permissions')
    await ethereum.enable()
    logger.log('User with web3 ethereum authenticated')
    /** The user accepted the app, now it's authenticated **/
    return web3Instance
  } catch (error) {
    /** The user denied the app, it's not authenticated **/
    logger.log('User with ethereum denied the access')
    throw new Error('User with ethereum denied the access')
  }
}

const loadWeb3Legacy = async () => {
  logger.log('Getting web3 legacy instance')
  const { web3 } = window
  return new Web3(web3.currentProvider)
}

export default metamaskProvider
