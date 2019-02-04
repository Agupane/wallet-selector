import Web3 from 'web3'
import logdown from 'logdown'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const metamaskProvider = {
  connect: async () => {
    console.log('Connected')
    let web3Instance
    let userData
    try {
      /** We get web3 instance **/
      web3Instance = await loadWeb3()
      console.log('web3 instance ', web3Instance)
      /** Once we got the web3 instance we need to get the user data **/
      userData = await loadUserDataFromWeb3(web3Instance)
      console.log('User dataaa', userData)
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

const loadUserDataFromWeb3 = async web3Instance => {
  logger.log('Loading user data from web3')
  let userData = {
    authenticated: null,
    address: '',
    currentNetwork: '',
    ethBalance: ''
  }
  let { eth } = web3Instance
  let { ethereum } = window
  let userAddress
  let userNetwork
  try {
    let results = await Promise.all([eth.getAccounts(), eth.net.getId()])
    userAddress = results[0]
    userNetwork = results[1]
    logger.log('User address', userAddress)
    logger.log('User network ', userNetwork)
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

      /** We subscribe to the event that detects if the user has changed the account **/
      ethereum.on('accountsChanged', async accounts => {
        logger.log('Account Changed ', accounts)
        let balance = await getUserBalanceInEth(web3Instance, accounts[0])
        userData = {
          ...userData,
          ethBalance: balance
        }
      })

      /** We subscribe to the event that detects if the user has changed the network **/
      ethereum.on('networkChanged', async network => {
        logger.log('Network changed ', network)
        let balance = await getUserBalanceInEth(web3Instance, userData.address)
        userData = {
          ...userData,
          currentNetwork: network,
          ethBalance: balance
        }
      })

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
  let checksumAddress = '0x'
  address = address.toLowerCase().replace('0x', '')

  // creates the case map using the binary form of the hash of the address
  let caseMap = parseInt(web3.utils.sha3('0x' + address), 16)
    .toString(2)
    .substring(0, 40)

  for (let i = 0; i < address.length; i++) {
    if (caseMap[i] === '1') {
      checksumAddress += address[i].toUpperCase()
    } else {
      checksumAddress += address[i]
    }
  }
  return checksumAddress
}

const getUserBalanceInEth = async (web3Instance, address) => {
  let balance = 0
  if (web3Instance && address) {
    balance = await web3Instance.eth.getBalance(address)
    balance = web3Instance.utils.fromWei(balance, 'ether')
  }
  return balance
}

export default metamaskProvider
