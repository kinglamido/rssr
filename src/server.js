import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import JssProvider from 'react-jss/lib/JssProvider'
import { SheetsRegistry } from 'react-jss/lib/jss'
import {
  MuiThemeProvider, createGenerateClassName
} from '@material-ui/core/styles'
import reload from 'reload'
import renderFullPage from './IndexHtml'
import App from './App'
import theme from './theme'
import routes from './routes'
import apiVersion1 from './api/api1'

const app = express()

const port = 4000
const dev = process.env.NODE_ENV === 'development'

app.use(express.static('public'))
app.use('/api', apiVersion1)

if (dev) {
  reload(app)
}

function handleRender (req, res, next) {
  const branch = matchRoutes(routes, req.url)
  const promises = []

  branch.forEach(({ route, match }) => {
    if (route.loadData) {
      promises.push(route.loadData(match))
    }
  })

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
    // // console.log(data)

    const context = data.reduce((context, data) => Object.assign(context, data), {})

    const sheetsRegistry = new SheetsRegistry()

    const sheetsManager = new Map()

    const generateClassName = createGenerateClassName()

    const css = sheetsRegistry.toString()

    const html = renderToString(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    )

    return res.send(renderFullPage(html, css, dev))
  }).catch(next)
}
app.use(handleRender)

app.listen(port, () => console.log(`http://localhost:${port}`))
