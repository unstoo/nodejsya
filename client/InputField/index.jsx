import React, { Component } from 'react'
import style from './style.css'

export default class InputField extends Component {
  render() {
    return (
    <div className={style.Layout}>
      <div className={style.LayoutLeft}>     
        { this.props.children[0] }
      </div>
      <div className={style.LayoutRight}>
        { this.props.children[1] }
      </div>
    </div>
    )
  }
}