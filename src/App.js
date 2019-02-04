import React, { Component } from 'react'
import './App.css'
import WalletSelector from './Components/UI/WalletSelector/WalletSelector'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <WalletSelector />
          </p>
        </header>
      </div>
    )
  }
}

export default App