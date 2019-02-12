import React, { Component } from 'react'
import './ModalWallet.css'
import { connect } from 'react-redux'
import WalletSelector from '../../Components/WalletSelector/WalletSelector'
import Modal from 'react-responsive-modal'
import logdown from 'logdown'
import * as actionUiCreators from '../../Redux/Actions/uiActions'
import Spinner from '../../Components/Common/UI/Spinner/Spinner'
const logger = logdown('WalletSelector:ModalWallet')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

class ModalWallet extends Component {
  state = {
    showSpinner: false
  }

  showLoadSpinner = (show, callback) => {
    console.log('showing spinner ', show)
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
    return (
      <Modal open={showModal} onClose={() => this.props.closeModal()} center>
        <h1>Connect a Wallet</h1>
        <h3>Get started by connecting one of the wallets bellow</h3>
        <Spinner showSpinner={this.state.showSpinner}>
          <WalletSelector
            showLoadSpinner={(show, callback) => this.showLoadSpinner(show, callback)}
            closeModal={() => this.props.closeModal()}
          />
        </Spinner>
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
    closeModal: () => dispatch(actionUiCreators.closeWalletSelector())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWallet)
