import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

// FORM_SUBMISSION_API_URL set by webpack.DefinePlugin()
// Edit the url in package.json
// Will use json json stubs in 'npm start' mode.
// See tryToAjax() in './App/index.jsx'
let formSubmitApiPoint = (FORM_SUBMISSION_API_URL ? FORM_SUBMISSION_API_URL : '')


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
