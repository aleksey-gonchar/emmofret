import React from 'react'

export default class HelloWorld extends React.Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='jumbotron'>
          <h1><i className='fa fa-fw fa-rocket'></i>Hello world</h1>
        </div>
      </div>
    )
  }
}
