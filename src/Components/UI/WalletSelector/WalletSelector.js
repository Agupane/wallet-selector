import React, { Component } from 'react'
import metamaskProvider from '../../Hoc/Web3Provider/MetamaskProvider'
import logdown from 'logdown'
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
    console.log('Wallet selected ', walletType)
    switch (walletType) {
      case supportedWallets.METAMASK: {
        await metamaskProvider.connect(
          (web3, userData) => {
            logger.log('User has been connected with web3 instance: ', web3)
            logger.log('User has the following data: ', userData)
          },
          userData => {
            logger.log('User data updated: ', userData)
          },
          error => {
            logger.log('There was an error while trying to connect with metamask ', error)
          }
        )
        break
      }
      case supportedWallets.LEDGER: {
        break
      }
      case supportedWallets.TREZOR: {
        break
      }
      default: {
        break
      }
    }
  }

  render() {
    return (
      <>
        <button color="primary" onClick={() => this.selectWallet(supportedWallets.METAMASK)}>
          Metamask
        </button>
        <button color="primary" onClick={() => this.selectWallet(supportedWallets.LEDGER)}>
          Ledger
        </button>
        <button color="primary" onClick={() => this.selectWallet(supportedWallets.TREZOR)}>
          Trezor
        </button>
      </>
    )
  }
}

export default WalletSelector
