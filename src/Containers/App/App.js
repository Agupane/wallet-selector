import React, { Component } from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../Home/Home'
import DashboardPage from '../Dashboard/Dashboard'
import * as actions from '../../Redux/Actions/authActions'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignOn()
  }

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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignOn: () => dispatch(actions.authCheckState())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
