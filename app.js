const express = require('express')
const ApiHelper = require('./api-helper/Api');
const BrowserHelper = require('./selenium-helper/BrowserHelper')

const app = express()
const port = 3000

app.get('/create-instance', async (req, res) => {


  const environment = req.query.env;
  let domain = 'pi.service.pl-labs.com'
  // Use the query parameter in your logic
  if (environment=='stacks' || environment =='stage') {
    console.log(environment=='stacks')
    domain = environment=='stacks' ? domain : 'app.pl-stage.com';
    const api = new ApiHelper(domain);
    const client = new BrowserHelper();
  
  
    let instance = await api.createInstance()
    console.log(instance+"/admin")
    await client.setAdminUser(instance);
    res.send(instance+"/admin");
  } else {
    res.send('Please provide a valid environment: stacks or stage');
  }


  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})