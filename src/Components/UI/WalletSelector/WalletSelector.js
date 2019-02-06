import React, { Component } from 'react'
import metamaskProvider from '../../../Utils/Web3Provider/MetamaskProvider'
import logdown from 'logdown'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from '../../../Redux/Actions/web3Actions'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const supportedWallets = {
  METAMASK: 'metamask',
  LEDGER: 'ledger',
  TREZOR: 'trezor'
}

class WalletSelector extends Component {
  state = {
    authenticating: false
  }

  selectWallet = async walletType => {
    switch (walletType) {
      case supportedWallets.METAMASK: {
        await metamaskProvider.connect(
          (web3, userData) => {
            logger.log('User has been connected with web3 instance: ', web3)
            logger.log('User has the following data: ', userData)
            this.finishAuthentication(true, () => {
              this.updateReduxState(web3, userData)
              this.props.history.push('/dashboard')
            })
          },
          userData => {
            logger.log('User data updated: ', userData)
            this.updateReduxState(null, userData)
          },
          error => {
            logger.error(error)
            this.finishAuthentication(false)
          }
        )
        break
      }
      case supportedWallets.LEDGER: {
        this.finishAuthentication(false)
        break
      }
      case supportedWallets.TREZOR: {
        this.finishAuthentication(false)
        break
      }
      default: {
        this.finishAuthentication(false)
        break
      }
    }
  }

  startAuthentication = walletType => {
    logger.log('Starting authentication with wallet: ', walletType)
    this.setState(
      {
        authenticating: true
      },
      () => {
        this.selectWallet(walletType)
      }
    )
  }

  finishAuthentication = (success, callback) => {
    logger.log('Finished authentication with success: ', success)
    this.setState(
      {
        authenticating: false
      },
      () => {
        if (success) {
          console.log('Authentication successful')
        } else {
          console.error('Authentication failed')
        }
        if (callback) {
          callback()
        }
      }
    )
  }

  updateReduxState = (web3, userData) => {
    logger.log('Updating redux state')
    if (web3) {
      this.props.setWeb3Instance(web3)
    }
    if (userData) {
      this.props.setUserAccountData(userData)
    }
  }

  render() {
    let content = <h3>Loading your account</h3>
    if (!this.state.authenticating) {
      content = (
        <>
          <button
            color="primary"
            onClick={() => this.startAuthentication(supportedWallets.METAMASK)}
          >
            Metamask
          </button>
          <button color="primary" onClick={() => this.startAuthentication(supportedWallets.LEDGER)}>
            Ledger
          </button>
          <button color="primary" onClick={() => this.startAuthentication(supportedWallets.TREZOR)}>
            Trezor
          </button>
        </>
      )
    }
    return content
  }
}

/** Which actions are executable in this component **/
const mapDispatchToProps = dispatch => {
  return {
    setUserAccountData: userData =>
      dispatch({ type: actionTypes.SET_USER_ACCOUNT_DATA, payload: userData }),
    setWeb3Instance: web3Instance =>
      dispatch({ type: actionTypes.SET_WEB3_INSTANCE, payload: web3Instance })
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(WalletSelector))
