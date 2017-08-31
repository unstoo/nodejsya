import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

let formSubmitApiPoint = `/your/api/point/url`

// DEVELOPMNENT set by webpack.DefinePlugin()
if (DEVELOPMENT === true) {  
  // Purge API url in order to use json stubs instead.
  // See tryToAjax() in './App/index.jsx'
  formSubmitApiPoint = `` 
}

const rootEl = document.getElementById('root')

const render = (Component, formSubmitApiPoint) =>
  ReactDOM.render(
    <AppContainer>
      <Component formActionUrl={formSubmitApiPoint} />
    </AppContainer>,
    document.getElementById('root')
  )

render(App, formSubmitApiPoint)

if (module.hot) module.hot.accept('./App', () => render(App, formSubmitApiPoint))
