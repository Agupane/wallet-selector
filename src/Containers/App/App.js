import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from '../Home/Home'
import { DashboardPage } from '../Dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </div>
    )
  }
}

export default App
