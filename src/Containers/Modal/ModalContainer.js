import React from 'react'
import './modal.css'
import Button from '../../Components/Common/UI/Button/Button'

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
export default ModalContainer
