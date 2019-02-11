import React, { Component } from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../Home/Home'
import DashboardPage from '../Dashboard/Dashboard'
import * as actions from '../../Redux/Actions/authActions'
import { connect } from 'react-redux'
import DelegatesContainer from '../Delegates/DelegatesContainer'
import Header from '../../Components/Header/Header'
import Auth from '../../Components/Auth/Auth'
import ModalWallet from '../ModalWallet/ModalWallet'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignOn()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <ModalWallet />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/delegates" component={DelegatesContainer} />
            /** TODO DELETE **/
            <Route exact path="/auth" component={Auth} />
          </Switch>
        </div>
      </Router>
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
