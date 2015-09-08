import React from 'react'
import {Route} from 'react-router'
import RouterContainer from './containers/RouterContainer'

/* containers */
import App from './containers/App.js'

/* partials */
import Dashboard from './pages/Dashboard.js'
import Private from './pages/Private.js'
import Public from './pages/Public.js'

export default (
  <Route component={App} >
    <Route path='/' component={Dashboard}/>
    <Route path='public' component={Public}/>
    <Route path='private' component={Private} onEnter={RouterContainer.requireAuth()}/>
  </Route>
)
//export default (
//  <Route component={App} >
//    <Route path='/' component={Dashboard} onEnter={this.atHome()}/>
//    <Route path='public' component={Public}/>
//    <Route path='private' component={Private} onEnter={this.requireAuth()}/>
//  </Route>
//)