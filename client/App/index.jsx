import React, { Component } from 'react'
import style from './style.css'
import FormLayout from '../FormLayout'
import ResultContainer from '../ResultContainer'
import InputField from '../InputField'
import Button from '../Button'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ajaxCallResult: 'none', // none,progress,error,success 
      formAction: `/api/`,
      errorFields: []
    }
  }

  inputFieldCallback(inputFieldName) {

  }

  composeApiForConsole() {
    return {
      validate() {},
      getData() {},
      setData(object) {},
      submit() { console.log(this) }
    }
  }

  buttonClickHandler() {
    console.info(`buttonClickHandler clicked!`)
    // check fields validation
    // if ok do ajax
  }

  render() {
    return (
      <FormLayout>
        <form action={this.formAction}>
          <InputField name={`fio`} type={`fio`} label={`ФИО`}/>
          <InputField name={`email`} type={`email`} label={`Email`}/>
          <InputField name={`phone`} type={`phone`} label={`Телефон`}/>
          <Button 
           buttonClickHandler={this.buttonClickHandler} 
           makeButtonDisabled={false}>
            Отправить
          </Button>
        </form>

        <ResultContainer ajaxCallResult={this.state.ajaxCallResult} />

        <script>{ window.MyForm = this.composeApiForConsole() }</script>        
      </FormLayout>
    )
  }
}