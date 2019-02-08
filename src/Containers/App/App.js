import React, { Component } from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../Home/Home'
import DashboardPage from '../Dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
