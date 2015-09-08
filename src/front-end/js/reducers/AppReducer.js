import notify from '../helpers/notify.js'
import _ from 'lodash'
import { handleActions } from 'redux-actions'
import constants from '../constants.js'
const { LOG_IN, LOG_OUT, SIGN_UP, REMEMBER_TRANSITION } = constants.application
import Router from 'react-router'

let data = {}
let window = window || global

if (_.has(window.sessionStorage, 'application')) {
  try {
    data = JSON.parse(window.sessionStorage.application)
  } catch (e) {
    delete window.sessionStorage.application
  }
}

const initialState = _.defaultsDeep(data, {
  isLoggedIn: _.isString(data.token),
  token: null,
  user: null,
  nextTransitionPath : null,
  router : null
})

function logIn (state, action) {
  notify.success('User successfully logged in')

  let newState = _.merge({}, state)
  newState.isLoggedIn = true
  newState.token = action.payload.token
  newState.user = _.omit(action.payload, 'token')
  window.sessionStorage.application = JSON.stringify(_.pick(newState, ['token', 'user']))
  return newState
}

function logOut (state) {
  notify.success('User successfully logged out')
  let newState = _.merge({}, state)
  newState.isLoggedIn = false
  newState.token = null
  newState.user = null
  delete window.sessionStorage.application
  return newState
}

function rememberTransition (state, action) {
  return _.merge({}, state, { nextTransitionPath: action.payload })
}

function fulfillTransition (state, action) {
  state.router.transitionTo(state.nextTransitionPath)
  return _.merge({}, state, { nextTransitionPath: null })
}

function discardNextTransition (state, action) {
  return _.merge({}, state, { nextTransitionPath: null })
}

function rememberRouter (state, action) {
  return _.merge({}, state, {router: action.payload})
}

function signUp (state) {
  notify.success('User successfully registered. Now you can log in.')
  return Object.assign({}, state)
}

export default handleActions({
  LOG_IN: logIn,
  LOG_OUT: logOut,
  SIGN_UP: signUp,
  REMEMBER_TRANSITION: rememberTransition,
  FULFILL_TRANSITION: fulfillTransition,
  DISCARD_NEXT_TRANSITION: discardNextTransition,
  REMEMBER_ROUTER: rememberRouter,
}, initialState)
