var React = require('react')
var Router = require('react-router')
import _ from 'lodash'

import Location from 'react-router/lib/Location'

import '../../src/front-end/js/vendor-config.js'
import initStore from '../../src/front-end/js/store'
import initRouter from '../../src/front-end/js/router'

var pkg = require(process.cwd() + '/package.json')

module.exports = (app) => {
  app.get('/*', (req, res, next) => {
    const location = new Location(req.path, req.query)
    let initialState = {}
    if (_.result(req, 'session.user')) {
      initialState.application = {
        token:  req.cookies.token,
        user:  req.session.user
      }
    }

    process.env.INITIAL_STATE = JSON.stringify(initialState)
    let store = initStore()

    initRouter(location, undefined, store)
      .then( ({content}) => {
        const html =  React.renderToString(content)

        var opts = {
          title: pkg.name,
          author: pkg.author,
          description: pkg.description,
          version: pkg.version,
          keywords: pkg.keywords.join(', '),
          html: html,
          initialState: JSON.stringify(store.getState()),
        }
        res.render('index', opts)
      })
      .catch( (err) => {
        next(err)
      })
  })
}