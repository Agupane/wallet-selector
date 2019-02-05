import Web3 from 'web3'
import logdown from 'logdown'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const metamaskProvider = {
  connect: async (cbSuccess, cbDataUpdated, cbError) => {
    let web3Instance
    let userData
    try {
      /** We get web3 instance **/
      web3Instance = await loadWeb3()
      /** Once we got the web3 instance we need to get the user data **/
      userData = await loadUserDataFromWeb3(web3Instance)
      /** We subscribe to the event that detects if the user has changed the account **/
      accountChangedSubscription(web3Instance, userData, updatedUserData => {
        logger.log('Executing update of user data for account changes')
        userData = updatedUserData
        cbDataUpdated(userData)
      })
      /** We subscribe to the event that detects if the user has changed the network **/
      networkChangedSubscription(web3Instance, userData, updatedUserData => {
        logger.log('Executing update of user data for network changes')
        userData = updatedUserData
        cbDataUpdated(userData)
      })
      /** We finally call the success callback with the data **/
      cbSuccess(web3Instance, userData)
    } catch (error) {
      cbError(error)
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

/** Returns balance, address, network of the user **/
const loadUserDataFromWeb3 = async web3Instance => {
  logger.log('Loading user data from web3')
  if (!web3Instance) {
    return
  }
  let userData = {
    authenticated: null,
    address: '',
    currentNetwork: '',
    ethBalance: ''
  }
  let { eth } = web3Instance
  let userAddress
  let userNetwork
  try {
    let results = await Promise.all([eth.getAccounts(), eth.net.getId()])
    userAddress = results[0]
    userNetwork = results[1]
    logger.log('User address', userAddress, ' User network:', userNetwork)
    /** Once we got the user data, we check if he has an address, otherwise we should throw an error **/
    if (userAddress.length !== 0) {
      let balance = await getUserBalanceInEth(web3Instance, userAddress[0])
      /** Converts address to checksumAddress **/
      userAddress = toChecksumAddress(web3Instance, userAddress[0])
      userData = {
        authenticated: true,
        address: userAddress,
        currentNetwork: userNetwork,
        ethBalance: balance
      }
      return userData
    } else {
      throw new Error('User does not have an address')
    }
  } catch (error) {
    throw error
  }
}

/** Converts the address from uppercase to lowercase (checksum format) in order to avoid metamask bug of using both address **/
const toChecksumAddress = (web3, address) => {
  let checksumAddress
  if (!web3 || !address) {
    return
  }
  checksumAddress = web3.utils.toChecksumAddress(address)
  return checksumAddress
}

/** Returns the user balance in ETH **/
const getUserBalanceInEth = async (web3Instance, address) => {
  let balance = 0
  if (web3Instance && address) {
    balance = await web3Instance.eth.getBalance(address)
    balance = web3Instance.utils.fromWei(balance, 'ether')
  }
  return balance
}

/** Event to detect if user has changed the account **/
const accountChangedSubscription = async (web3Instance, userData, onChangeCb) => {
  const { ethereum } = window
  if (!web3Instance || !userData || onChangeCb) {
    return
  }
  ethereum.on('accountsChanged', async accounts => {
    logger.log('Account Changed ', accounts)
    let balance = await getUserBalanceInEth(web3Instance, accounts[0])
    let userAddress = toChecksumAddress(web3Instance, accounts[0])
    userData = {
      ...userData,
      address: userAddress,
      ethBalance: balance
    }
    onChangeCb(userData)
  })
  return userData
}

/** Event to detect if user has changed the network **/
const networkChangedSubscription = async (web3Instance, userData, onChangeCb) => {
  const { ethereum } = window
  if (!web3Instance || !userData || onChangeCb) {
    return
  }
  ethereum.on('networkChanged', async network => {
    logger.log('Network changed ', network)
    let balance = await getUserBalanceInEth(web3Instance, userData.address)
    userData = {
      ...userData,
      currentNetwork: network,
      ethBalance: balance
    }
    onChangeCb(userData)
  })
  return userData
}

export default metamaskProvider
