import React, { Component } from 'react'
import style from './style.css'
import FormLayout from '../Layout'
import ResultContainer from '../ResultContainer'

const SourceApi = {

}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ajaxCallResult: 'none' // pending,error,success 
    }
  }

  composeApiForConsole() {
    return {
      validate() {},
      getData() {},
      setData(object) {},
      submit() {}
    }
  }

  render() {
    return (
        <FormLayout>
          {/* <Form method={} targetUrl={} callback={}>
            <InputField name={`fio`} type={`fio`} />
            <InputField name={`email`} type={`email`} />
            <InputField name={`phone`} type={`phone`}/>
            <Button/>
          </Form> */}
          <form>
            <div>ФИО <input type="text" name="fio"/></div>
            <div>Email  <input type="text" name="email"/></div>
            <div>Телефон -<input type="text" name="phone"/></div>
            <div><button id="submitButton">Отправтиь</button></div>
          </form>
          <ResultContainer ajaxCallResult={`none`} />
          <script>{ window.MyForm = this.composeApiForConsole() }</script>
        </FormLayout>
    )
  }
}



{/* <ResultContainer/>
 \
  \______<ResultCodeDisplay/>
   \
    \_____<Result */}

