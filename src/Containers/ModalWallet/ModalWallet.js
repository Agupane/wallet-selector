import React from 'react'
import './ModalWallet.css'
import * as actions from '../../Redux/Actions/web3Actions'
import { connect } from 'react-redux'
import WalletSelector from '../../Components/WalletSelector/WalletSelector'
import Modal from 'react-responsive-modal'

const ModalWallet = props => {
  let { showModal, title, description, children, hideModal } = props
  //  hideModal = () => console.log("test")
  console.log('hide modal ', hideModal)

  return (
    <Modal open={showModal} onClose={() => console.log('modal closed')} center>
      <h1>Connect a Wallet</h1>
      <h3>Get started by connecting one of the wallets bellow</h3>
      <WalletSelector />
    </Modal>
  )
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { web3Store } = state
  return {
    showModal: web3Store.walletSelectorModal.show
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(actions.closeWalletSelector())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWallet)
