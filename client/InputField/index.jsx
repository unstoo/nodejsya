import React, { Component } from 'react'
import style from './style.css'

const errStyle = {
  border: `1px solid red`
}

export default class InputField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: this.props.value,
      isInputValueValid: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.valueCheck = inputValueTypeCheck[this.props.type].bind(this)
  }

  handleInputChange(e) {
    const inputFieldName = this.props.name
    const inputValue = e.target.value
    const isInputValueValid = this.valueCheck(inputValue)

    this.setState({inputValue, isInputValueValid})
    this.props.inputFieldCallback(inputFieldName, isInputValueValid, inputValue)
  }

  componentWillReceiveProps(nextProps){
    if(this.state.inputValue !== nextProps.value) {
      this.setState({inputValue: nextProps.value})
    }
  }

  render() {
    const applyStyle = {}
    if (this.props.errorHighlight && !this.state.isInputValueValid) {
      applyStyle.border = `1px solid red`
    }

    return (
      <div className={style.InputFieldLayout} style={applyStyle}>
        <label className={style.InputLabel}> 
          {this.props.label}
        </label>
        <input 
         type="text" 
         name={this.props.name} 
         onChange={this.handleInputChange} 
         value={this.state.inputValue}
         className={style.InputField}
        />
      </div>
    )
  }
}


// <InputField name={`fio`} type={`fio`} label={`ФИО`} value={string} callback={function} />

const inputValueTypeCheck = {

  fio(value) {    
    value = value.trim()

    if (value.trim().length === 0) {
      // Empty string?
      return false
    }

    if (value.match(/[^\s\-a-zA-ZdÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐðёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ]/g)){
      // Only letters, whitespaces and hyphons accepted.
      return false
    }
    
    value = value.replace(/ {2,}/g, / /)
    if (value.match(/ /g) === null || value.match(/ /g).length !== 2) {
      // Three words required.
      return false
    }
    
    let test = true
    value.split(` `).forEach(word => {
      
      // Name must have at least a letter
      if(!word.match(/[a-zA-ZdÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐðёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ]/g)){
        test = false
      }
      if(word.match(/^\-|\-$|\-{2,}/g)) {
        // Name can't start or end with hyphon
        test = false
      }
    })
    
    console.log(`fio-test: `, test)
    return test
  },

  
  email(value) {
    const validDomains = ["ya.ru", "yandex.ru", "yandex.ua", "yandex.by", "yandex.kz", "yandex.com"]
    let test = true    
    value = value.trim()
    
    if (!value.length) {
      return false
    }

    if (value.match(/([ \{\}|`'";:?&=<,>#~!$%^&*(+)\-\[\]\/\\]|\.{2,}|\.@|\.@\.|@\.|^\.|\.$)/g)){
      // Some invalid characters and combinations. 
      return false
    }  

    value = value.split('@') 
    if (value.length !== 2) {
      return false
    }

    if(!validDomains.includes(value[1])) {
      return false
    }

    return test
  },

  // начинается на +7, и имеет формат +7(999)999-99-99. 
  // Кроме того, сумма всех цифр телефона не должна превышать 30
  phone(value) {
    let test = true
    
    

    if (!value.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/g)) {
      return false
    }

    const nonDigitSymbolsFreeArray = value.split(/\D/g).join('').split('')

    const result = nonDigitSymbolsFreeArray.reduce((total, digit) => {
      return Number(total) + Number(digit)
    })

    if (result > 30) {
      return false
    }

    return test
  }
}