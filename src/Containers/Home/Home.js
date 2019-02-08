/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react'
import WalletSelector from '../../Components/WalletSelector/WalletSelector'

class HomePage extends Component {
  render() {
    return (
      <>
        <h2>Welcome to home Page!</h2>
        <WalletSelector />
      </>
    )
  }
}

export default HomePage
