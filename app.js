const express = require('express')
const ApiHelper = require('./api-helper/Api');
const BrowserHelper = require('./selenium-helper/BrowserHelper')

const app = express()
const port = 3000

app.get('/create-instance', async (req, res) => {


  const environment = req.query.env;
 
  if (environment=='stacks' || environment =='stage') {
   
    const api = new ApiHelper(environment);
    const client = new BrowserHelper();
  
  
    let instance = await api.createInstance()
    console.log(instance.response)
    if(!instance.includes('AxiosError')){
      console.log(instance+"/admin")
      await client.setAdminUser(instance);
      res.send(instance+"/admin");
    }else{
      res.send("unable to create instance")
    }
    
    
  } else {
    res.send('Please provide a valid environment: stacks or stage');
  }


  

})

app.get('/setup-ldap', async (req, res) => {


  const instance = req.query.instance;
  const url = new URL(instance);
  const host = url.host;

  const client = new BrowserHelper();

  await client.login(host);
  await client.setLdap();
  res.send(host);


  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})