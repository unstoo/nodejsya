import React, { Component } from 'react'
import style from './style.css'

export default class Button extends Component {
  render() {
    const name = this.props.children
    return (
      <button 
       className={style.Button}
       onClick={this.props.buttonClickHandler} 
       disabled={this.props.makeButtonDisabled}>
        {name}
      </button>
    )
  }
}
