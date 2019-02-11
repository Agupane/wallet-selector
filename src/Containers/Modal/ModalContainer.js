import React from 'react'
import './modal.css'
import * as actions from '../../Redux/Actions/authActions'
import { connect } from 'react-redux'

const ModalContainer = props => {
  const { showModal, title, description, children, hideModal } = props
  if (showModal)
    return (
      <div className="modal" onClick={() => hideModal()}>
        <div className="modal-main">
          {title ? <p className="title">{title}</p> : null}
          {description ? <p className="description">{description}</p> : null}
          {children}
        </div>
      </div>
    )
  return null
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { modalStore } = state
  return {
    showModal: modalStore.showModal,
    modalTitle: modalStore.modalTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer)
