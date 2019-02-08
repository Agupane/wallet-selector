import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '../../Redux/Store/store'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
})
