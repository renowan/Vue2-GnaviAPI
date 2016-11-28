import Koa from 'koa'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import convert from 'koa-convert'
import webpack from 'webpack'
import historyApiFallback from 'koa-connect-history-api-fallback'
import _debug from 'debug'
import opn from 'opn'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

import config from '../config'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

import webpackDevConfig from './webpack.dev.conf'
import webpackProdConfig from './webpack.prod.conf'

const debug = _debug('app:server')
const port = process.env.PORT || config.dev.port

const app = new Koa()

// Enable koa-proxy if it has been enabled in the config.
if (config.dev.proxy && config.dev.proxy.enabled) {
  app.use(convert(proxy(config.dev.proxy.options)))
}

app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (process.env.NODE_ENV === 'development') {

  const compiler = webpack(webpackDevConfig)

  // Enable webpack-dev and webpack-hot middleware
  const publicPath = `http://${config.dev.serverHost}:${config.dev.port}/`;

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  // paths.client.... /Users/on/Desktop/Git/gnavi-electron/src/static
  app.use(convert(serve(config.dev.staticPath)))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  // app.use(convert(serve(paths.base(config.dir_dist))))
  app.use(convert(serve('app/dist')))
}

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
// export default app
