import React, { Component } from 'react'
import './ModalWallet.css'
import { connect } from 'react-redux'
import WalletSelector from '../../Components/WalletSelector/WalletSelector'
import Modal from 'react-responsive-modal'
import logdown from 'logdown'
import * as actionUiCreators from '../../Redux/Actions/uiActions'
import Loader from 'react-loader-spinner'
const logger = logdown('WalletSelector:ModalWallet')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

class ModalWallet extends Component {
  state = {
    showSpinner: false
  }

  showLoadSpinner = (show, callback) => {
    console.log('showing spinner ', show, callback)
    this.setState(
      {
        showSpinner: show
      },
      () => {
        if (callback) {
          callback()
        }
      }
    )
  }

  render() {
    let { showModal } = this.props
    let walletContent = <Loader type="Oval" color="#00BFFF" height="100" width="100" />
    if (!this.state.showSpinner) {
      walletContent = (
        <WalletSelector
          showLoadSpinner={(show, callback) => this.showLoadSpinner(show, callback)}
          closeModal={() => this.props.closeModal()}
        />
      )
    }
    return (
      <Modal open={showModal} onClose={() => logger.log('Wallet selector closed')} center>
        <h1>Connect a Wallet</h1>
        <h3>Get started by connecting one of the wallets bellow</h3>
        {walletContent}
      </Modal>
    )
  }
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { uiStore } = state
  return {
    showModal: uiStore.showWalletSelectorModal
  }
}
/** Which actions are executable in this component **/
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actionUiCreators.closeWalletSelector()),
    showLoadingSpinner: show => dispatch(actionUiCreators.showLoadingSpinner(show))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWallet)
