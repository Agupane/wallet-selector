import React, { Component } from 'react'
import metamaskProvider from '../../../Utils/Web3Provider/MetamaskProvider'
import logdown from 'logdown'
import { withRouter } from 'react-router-dom'
const logger = logdown('WalletSelector:MetamaskProvider')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const supportedWallets = {
  METAMASK: 'metamask',
  LEDGER: 'ledger',
  TREZOR: 'trezor'
}

class WalletSelector extends Component {
  state = {
    authenticating: false,
    web3: null
  }

  selectWallet = async walletType => {
    switch (walletType) {
      case supportedWallets.METAMASK: {
        await metamaskProvider.connect(
          (web3, userData) => {
            logger.log('User has been connected with web3 instance: ', web3)
            logger.log('User has the following data: ', userData)
            this.finishAuthentication(true)
          },
          userData => {
            logger.log('User data updated: ', userData)
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
        ...this.state,
        authenticating: true
      },
      () => {
        this.selectWallet(walletType)
      }
    )
  }

  finishAuthentication = success => {
    logger.log('Finished authentication with success: ', success)
    this.setState(
      {
        ...this.state,
        authenticating: false
      },
      () => {
        /** TODO -- Implement routing or redux state update **/
        if (success) {
          console.log('Authentication successful')
          this.props.history.push('/dashboard')
        } else {
          console.error('Authentication failed')
        }
      }
    )
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

export default withRouter(WalletSelector)
