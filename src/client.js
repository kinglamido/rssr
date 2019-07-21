import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  MuiThemeProvider, createGenerateClassName
} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import App from './App'
import theme from './theme'

const generateClassName = createGenerateClassName()
ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root'),
  () => {
    const jssStyles = document.getElementById('jss-styles')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
)
