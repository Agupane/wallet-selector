import React, { Component } from 'react'
import Web3 from 'web3'

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
    console.log('wallet selected ', walletType)
    switch (walletType) {
      case supportedWallets.METAMASK: {
        await this.metamaskProvider.connect((web3, userData) => {}, error => {})
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
