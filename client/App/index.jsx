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
      formActionUrl: `/api/`,
      validationErrorHiglight: false,
      inputFields: {
        fio:{ validnessIndicator: true, value: ``},
        email:{ validnessIndicator: true, value: ``},
        phone:{ validnessIndicator: true, value: ``},
      }
    }

    this.composeApiForConsole = this.composeApiForConsole.bind(this)
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
    this.inputFieldCallback = this.inputFieldCallback.bind(this)
  }

  inputFieldCallback(inputFieldName, validnessIndicator, fieldValue) {    
    const state = this.state
    state.inputFields[inputFieldName].validnessIndicator = validnessIndicator
    state.inputFields[inputFieldName].value = fieldValue
    this.setState(state) 
  }

  composeApiForConsole(thisComponent) {
    return {
      // Метод validate возвращает объект с признаком результата валидации (isValid) 
      // и массивом названий полей, которые не прошли валидацию (errorFields).
      validate() {
        const fields = thisComponent.state.inputFields        
        const errorFields = []

        for(let key in fields) {                    
          if(fields[key].validnessIndicator === false)
           errorFields.push(key)
        }
        console.log(`errorFields: `, errorFields)
        return {
          isValid: errorFields.length > 0 ? false : true,
          errorFields
        }
      },
      getData() {},
      setData(object) {},
      
      // Метод submit выполняет валидацию полей и отправку ajax-запроса, 
      // если валидация пройдена. Вызывается по клику на кнопку отправить.
      submit() { 
        console.log(thisComponent.buttonClickHandler()) 
      }
    }
  }

  buttonClickHandler(e) {
    // There's no event object if the method is invoked in console.
    if (e !== undefined) {
      e.preventDefault()
    }

    const areInputFieldsValuesValid = this.composeApiForConsole(this).validate().isValid    
    areInputFieldsValuesValid ?
    // ajax() 
    console.log(true) 
    :  this.setState({validationErrorHiglight: true})
    // Если валидация не прошла, соответствующим инпутам должен добавиться класс error
    // с заданным стилем border: 1px solid red.
  }

  render() {
    const props = { 
      errorHighlight: this.state.validationErrorHiglight, 
      inputFieldCallback: this.inputFieldCallback 
    }

    const fields = this.state.inputFields

    return (
      <FormLayout>
        <form action={this.actionUrl}>
          <InputField name={`fio`} type={`fio`} label={`ФИО`} value={fields[`fio`].value} {...props} />
          <InputField name={`email`} type={`email`} label={`Email`} value={fields[`email`].value}{...props}/>
          <InputField name={`phone`} type={`phone`} label={`Телефон`} value={fields[`phone`].value} {...props}/>
          
          <Button 
           buttonClickHandler={this.buttonClickHandler} 
           makeButtonDisabled={false}>
            Отправить
          </Button>
        </form>

        <ResultContainer ajaxCallResult={this.state.ajaxCallResult} />

        <script>
          { window.MyForm ? true : window.MyForm = this.composeApiForConsole(this) }
        </script>        
      </FormLayout>
    )
  }
}