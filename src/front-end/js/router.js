import React, { PropTypes } from 'react'
import Router from 'react-router'
import { Provider } from 'react-redux'

import routes from './routes'

export default (location, history, store) => {

  return new Promise( (resolve, reject) => {
    Router.run(routes, location, (error, initialState, transition) => {
      if (error) {
        return reject(error)
      }

      if (history) {
        initialState.history = history
      }

      const content = (
        <Provider store={store} key="provider">
          {() => <Router {...initialState} children={routes}/>}
        </Provider>
      )
      resolve({content})
    })
  })
}
