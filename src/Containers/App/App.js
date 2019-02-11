import React, { Component } from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
/** Pages **/
import HomePage from '../Home/Home'
import DashboardPage from '../Dashboard/Dashboard'
import MyAccountPage from '../MyAccount/MyAccount'
import DelegatesPage from '../Delegates/Delegates'
/** Components **/
import ModalWallet from '../ModalWallet/ModalWallet'
import Header from '../../Components/Header/Header'
import Redirect from 'react-router/es/Redirect'
import Spinner from '../../Components/Common/UI/Spinner/Spinner'

class App extends Component {
  componentDidMount() {
    //  this.props.onTryAutoSignOn()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Spinner>
            <ModalWallet />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/delegates" component={DelegatesPage} />
              <Route exact path="/myAccount" component={MyAccountPage} />
              <Redirect to="/" />
            </Switch>
          </Spinner>
        </div>
      </Router>
    )
  }
}

/*
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignOn: () => dispatch(actions.authCheckState())
  }
}
*/

export default connect(
  null,
  null
)(App)
