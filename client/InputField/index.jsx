import React, { Component } from 'react'
import style from './style.css'

export default class InputField extends Component {
  render() {
    return (
      <div className={style.InputFieldLayout}>
        <label className={style.InputLabel}> 
          {this.props.label}
        </label>
        <input 
         className={style.InputField}
         type="text" 
         name={this.props.name} 
         placeholder={this.props.type}/>
      </div>
    )
  }
}


// <InputField name={`fio`} type={`fio`} label={`ФИО`}/>