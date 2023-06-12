const express = require('express')
const ApiHelper = require('./api-helper/Api');
const BrowserHelper = require('./selenium-helper/BrowserHelper')

const app = express()
const port = 3000

app.get('/', async (req, res) => {
 
  const api = new ApiHelper('https://api.example.com');
  const client = new BrowserHelper();


  let instance = await api.createInstance()
  console.log(instance+"/admin")
  await client.setAdminUser(instance);
  res.send(instance+"/admin");

  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})