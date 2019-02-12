import React from 'react'
import metamaskProvider from '../../Utils/Web3Provider/MetamaskProvider'
import logdown from 'logdown'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../Redux/Actions/web3Actions'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const supportedWallets = {
  METAMASK: 'metamask',
  LEDGER: 'ledger',
  TREZOR: 'trezor'
}

const walletSelector = props => {
  const selectWallet = async walletType => {
    switch (walletType) {
      case supportedWallets.METAMASK: {
        await metamaskProvider.connect(
          (web3, userData) => {
            logger.log('User has been connected with web3 instance: ', web3)
            logger.log('User has the following data: ', userData)
            updateReduxState(web3, userData, () => {
              props.closeModal()
              props.history.push('/myAccount')
            })
          },
          userData => {
            logger.log('User data updated: ', userData)
            updateReduxState(null, userData)
          },
          error => {
            logger.error(error)
            finishAuthentication(false)
          }
        )
        break
      }
      case supportedWallets.LEDGER: {
        finishAuthentication(false)
        break
      }
      case supportedWallets.TREZOR: {
        finishAuthentication(false)
        break
      }
      default: {
        finishAuthentication(false)
        break
      }
    }
  }

  const startAuthentication = walletType => {
    logger.log('Starting authentication with wallet: ', walletType)
    props.showLoadSpinner(true, () => {
      selectWallet(walletType)
    })
  }

  const finishAuthentication = success => {
    logger.log('Finished authentication with success: ', success)
    /** TODO MANAGE error **/
    success ? props.showLoadSpinner(false) : props.showLoadSpinner(false)
  }

  const updateReduxState = (web3, userData, callback) => {
    logger.log('Updating redux state')
    if (web3) {
      props.setWeb3Instance(web3)
    }
    if (userData) {
      console.log('setting user account data')
      props.setUserAccountData(userData, callback)
    }
  }

  return (
    <>
      <button color="primary" onClick={() => startAuthentication(supportedWallets.METAMASK)}>
        Metamask
      </button>
      <button color="primary" onClick={() => startAuthentication(supportedWallets.LEDGER)}>
        Ledger
      </button>
      <button color="primary" onClick={() => startAuthentication(supportedWallets.TREZOR)}>
        Trezor
      </button>
    </>
  )
}

/** Which actions are executable in this component **/
const mapDispatchToProps = dispatch => {
  return {
    setWeb3Instance: web3Instance => dispatch(actionCreators.setWeb3Instance(web3Instance)),
    setUserAccountData: (userData, cb) => dispatch(actionCreators.setUserAccountData(userData, cb))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(walletSelector))
