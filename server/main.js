const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const config = require("../webpack.config.js")

const app = express()
const DIST_DIR = path.join(__dirname, "../dist")
const compiler = webpack(config)
const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3000

if(!isProduction) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))
} else {
  app.get('/', function(req, res) {
    res.sendFile(path.join(DIST_DIR + '/index.html'))
  })

  app.get('/index.js', function(req, res) {
    res.sendFile(path.join(DIST_DIR + '/index.js'))
  })
}

app.listen(port)
