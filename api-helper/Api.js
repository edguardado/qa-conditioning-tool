const axios = require('axios');

class ApiHelper {
    constructor(domain) {
      this.domain = domain;
    }

     generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          result += characters.charAt(randomIndex);
        }
      
        return result;
      }

    async createInstance(){

        let token = await this.getToken();
        let instance = this.generateRandomString(5);
        let vanityUrl = "https://"+instance+"."+this.domain;
     
     
        let data = JSON.stringify({
            "expirationDate": "2098-12-31T00:00:00+00:00",
            "licenseCountRelease": 50000,
            "licenseCountStandard": 50000,
            "licenseType": "normal",
            "mspId": 2,
            "name": "Vasion",
            "parentId": 2788,
            "vanityUrl": vanityUrl,
            "addInstance": "both",
            "instanceStatus": "Active"
          });
         
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://mc-api.'+this.domain+'/api/smb',
            headers: { 
              'Content-Type': 'application/json', 
              'Accept': 'application/json', 
              'Authorization': 'Bearer '+token
            },
            data : data
          };
         
          return axios.request(config)
          .then((response) => {
            console.log(response.data)
            return JSON.parse(JSON.stringify(response.data["object"]["vanityUrl"]));
          })
          .catch((error) => {
            return (error);
          }); 
     
        
 


    }

    async getToken(){
       
let data = JSON.stringify({
  "email": "keymaster@printerlogic.com",
  "password": "password1"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://mc-api.'+this.domain+'/api/user/login',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
  },
  data : data
};

let token = await axios.request(config)
.then((response) => {
  return JSON.parse(JSON.stringify(response.data["token"]));
})
.catch((error) => {
  console.log(error);
});

return token;

    }
  
    async get(endpoint, queryParams = {}) {
      try {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
          params: queryParams
        });
        return response.data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  
    async post(endpoint, data) {
      try {
        const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
        return response.data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  
    // Add methods for other HTTP methods like PUT, DELETE, etc.
  }
  module.exports = ApiHelper;