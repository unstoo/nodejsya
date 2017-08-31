const listOfStubFiles = [`success.stub.json`, `error.stub.json`, `progress.stub.json`]

 const randomApiResponsePicker = () => {
  const randomInt  = (Math.random()*100).toFixed() % 3
  return listOfStubFiles[randomInt]
}

export default randomApiResponsePicker