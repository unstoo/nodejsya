import React, { Component } from 'react'
import style from './style.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: `error`
    }
  }
  render() {
    return (    
      <div className={style.ResultContainer} style={styleModefier[this.state.status]} id="resultContainer">
        Результат: 
        <span className={style.ResultCodeDisplay}>
          {`It's a stub.`}
        </span>
      </div>
    )
  }
}

const styleModefier = {
  success: {
    borderBottom: `3px solid lightgreen`
  },
  error: {
    borderBottom: `3px solid red`
  },
  progress: {
    borderBottom: `3px solid silver`
  },
  none: {
    borderBottom: `3px solid skyblue`
  }
}