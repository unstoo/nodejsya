import React, { Component } from 'react'
import style from './style.css'

export default class ResultContainer extends Component {

  render() {
    const response = this.props.ajaxResponse
    return (    
      <div className={style.ResultContainer} style={styleModefier[response.status]} id="resultContainer">
        Результат: 
        <span className={style.ResultCodeDisplay}>
          { response.status }
          { response.reason ? ` ` + response.reason : `` }
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
    borderBottom: `none`
  }
}