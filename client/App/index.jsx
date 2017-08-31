import React, { Component } from 'react'
import style from './style.css'
import FormLayout from '../FormLayout'
import ResultContainer from '../ResultContainer'
import InputField from '../InputField'
import Button from '../Button'
import randomApiResponsePicker from '../randomApiStubChoise.js'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ajaxFormSubmissionStage: {code: 'none', msg: ''}, // none,progress,error,success 
      submitFormToUrl: `/api/`,
      enableInputFieldsErrorHiglighting: false,
      disableFormButton: false,
      inputFields: {
        fio:{ validnessIndicator: false, value: ``},
        email:{ validnessIndicator: false, value: ``},
        phone:{ validnessIndicator: false, value: ``},
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
        
        return {
          isValid: errorFields.length > 0 ? false : true,
          errorFields
        }
      },

      // Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов
      getData() {
        const dataObject = {}
        const {inputFields} = thisComponent.state

        for(let key in inputFields) {
          dataObject[key] = inputFields[key].value
        }

        return dataObject
      },
      
      // Метод setData принимает объект с данными формы и устанавливает их инпутам формы. 
      // Поля кроме phone, fio, email игнорируются.
      setData(dataObject) {
        const { fio, email, phone } = dataObject
        const stateChunk = Object.assign({}, thisComponent.state.inputFields)
        stateChunk.fio.value = fio
        stateChunk.email.value = email
        stateChunk.phone.value = phone
        
        thisComponent.setState({inputFields: stateChunk})
      },
      
      // Метод submit выполняет валидацию полей и отправку ajax-запроса, 
      // если валидация пройдена. Вызывается по клику на кнопку отправить.
      submit() { 
        thisComponent.buttonClickHandler()
      }
    }
  }


  buttonClickHandler(e) {
    // There's no event object if the method is invoked from the console.
    if (e !== undefined) {
      e.preventDefault()
    }

    const areInputFieldsValuesValid = this.composeApiForConsole(this).validate().isValid 

    if (areInputFieldsValuesValid) {
      // Disable submit button
      const newState = Object.assign({}, this.state)
      newState.disableFormButton = true
      newState.ajaxFormSubmissionStage = {code: 'listening', msg: ''}
      this.setState(newState)

      // AJAX API; wait for response;
      submitFormDataByAjax(this.state.submitFormToUrl, 
        {
          fio: newState.inputFields.fio.value,
          email: newState.inputFields.email.value,
          phone: newState.inputFields.phone.value,
        },
        (response) => {
          const updatedState = this.state
          updatedState.ajaxFormSubmissionStage.status = response.status
          updatedState.ajaxFormSubmissionStage.reason = response.reason || ``
          
          this.setState({updatedState})
        }
      )

    } else {
      // Если валидация не прошла, соответствующим инпутам должен добавиться класс error
      // с заданным стилем border: 1px solid red.    
      this.setState({enableInputFieldsErrorHiglighting: true})
    }
  }

  render() {
    
    const props = { 
      errorHighlight: this.state.enableInputFieldsErrorHiglighting, 
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
           makeButtonDisabled={this.state.disableFormButton}>
            Отправить
          </Button>
        </form>

        <ResultContainer ajaxResponse={this.state.ajaxFormSubmissionStage}/>

        <script>
          { window.MyForm ? true : window.MyForm = this.composeApiForConsole(this) }
        </script>        
      </FormLayout>
    )
  }
}


// a. {"status":"success"} – контейнеру resultContainer должен быть выставлен класс success и добавлено содержимое с текстом "Success"
// b. {"status":"error","reason":String} - контейнеру resultContainer должен быть выставлен класс error и добавлено содержимое с текстом из поля reason
// c. {"status":"progress","timeout":Number} - контейнеру resultContainer должен быть выставлен класс progress и через timeout миллисекунд необходимо повторить запрос (логика должна повторяться, пока в ответе не вернется отличный от progress статус)
const submitFormDataByAjax = (apiUrl, data, callback) => {

  const tryToAjax = () => {
    const randomApiResponse = `/client/${randomApiResponsePicker()}`

    fetch(randomApiResponse /*, { data } */)
    .then(response => {
      return response.json()    
    }).then(json => {

      const {status} = json      
      console.info(`AJAX Responded with: `, json)
      
      if(status === `progress`) {
        setTimeout(tryToAjax, json.timeout)
        callback(json)
      }

      if(status === `error`) { callback(json) }

      if(status === `success`) { callback(json) }  
    })
  }
  tryToAjax()
}

  