# EMMOFRET
( __E__xpress __M__ongoose __MO__ngo __F__lux __RE__act __T__witterbootstrap )
__Full stack js boilerplate__
---
[![GitHub version](https://badge.fury.io/gh/aleksey-gonchar%2Femmofret.svg)](http://badge.fury.io/gh/aleksey-gonchar%2Femmofret)

## Preface

The main purpose of this boiler plate is to shorten scaffolding for every new project with ready to use universal solution bundle. It can be easily extended and customized. It contains implementation of basic features such as:
 
* Server:
    * Multi environment configuration
    * Api route CRUD helpers and tests
    * [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) render and component state prefetch
    * Api request logging middleware
* Client:    
    * 'Login' and 'Sign up' of users
    * Private and public section access permission check
    * Modal popup demo
    * Async api call middleware

Base technology stack consist of:
 
* express.js@4.13.1 - http server
* bunyan@1.4.0 - full featured logging
* mongoose@4.1.6 - schema based MongoDB interface
* mocha@2.2.5 + chai@2.3.0 - testing framework
* react@0.13.3 - client side virtual DOM view manipulation and rendering 
* react-router@1.0.0-beta3 - universal router
* react-redux@1.0.1 - binding redux state and actions into react components
* react-bootstrap@0.24.3 - easy rendering of twitter-bootstrap elements in react style
* redux@1.0.1 - flux implementation with single app state and reducers
* redux-devtools@2.1.0 - DX tool
* bootstrap@3.3.5 - facebook UI/UX framework
* babel@5.8.23 - ES5/6/7 polyfill
* webpack@1.12.1 - source code bundle maker
* konphyg@1.4.0 - multi environment json based app config

## Installation

```
npm i
```

## Contribution

I was using a tons of different web sources and examples, but big redux part of this repo is based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) example.
