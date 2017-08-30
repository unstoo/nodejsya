import React, { Component } from 'react'
import style from './style.css'

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.clickButtonHandler = this.clickButtonHandler.bind(this)
  }
  
  clickButtonHandler(e) {
    e.preventDefault()
    this.props.buttonClickHandler()
  }

  render() {
    const name = this.props.children
    return (
      <button 
       className={style.Button}
       onClick={this.clickButtonHandler} 
       disabled={this.props.makeButtonDisabled}>
        {name}
      </button>
    )
  }
}