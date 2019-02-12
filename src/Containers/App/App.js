import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
/** Pages **/
import HomePage from '../Home/Home'
import DashboardPage from '../Dashboard/Dashboard'
import MyAccountPage from '../MyAccount/MyAccount'
import DelegatesPage from '../Delegates/Delegates'
/** Components **/
import ModalWallet from '../ModalWallet/ModalWallet'
import Header from '../../Components/Header/Header'
import Redirect from 'react-router/es/Redirect'

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <ModalWallet />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/delegates" component={DelegatesPage} />
        <Route exact path="/myAccount" component={MyAccountPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
