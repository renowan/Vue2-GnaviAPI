import WebpackDevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from '../lib/apply-express-middleware'
import _debug from 'debug'
import config from '../../config'

const debug = _debug('app:server:webpack-dev')

export default function (compiler, publicPath) {
  debug('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: config.dev.contentBase,
    hot: true,
    quiet: config.dev.compiler_quiet,
    noInfo: config.dev.compiler_quiet,
    lazy: false,
    stats: config.dev.compiler_stats
  })

  return async function koaWebpackDevMiddleware (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}
