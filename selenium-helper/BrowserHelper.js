
const browser = require('pl-aut-web-fw');

class BrowserHelper {
    constructor() {
      
      }

   async setAdminUser(instance){

        await browser.Browser.openPage(instance+"/admin")
        const rootUser = await browser.Browser.getElement("id", "root-user")
        const rootEmail = await browser.Browser.getElement("id", "root-user-email")
        const rootPassword = await browser.Browser.getElement("id", "root-user-password")
        const rootPasswordConfirm = await browser.Browser.getElement("id", "root-user-password-confirmation")
        //const createButton = await browser.Browser.getElement("id", "create-database-button")

        
        await browser.Browser.setValue(rootUser, 'root')
        await browser.Browser.setValue(rootEmail, 'eduardo.guardado@vasion.com')
        await browser.Browser.setValue(rootPassword, 'password1')
        await browser.Browser.setValue(rootPasswordConfirm, 'password1')
        await browser.Browser.click("id", "create-database-button")
       
    }

}

module.exports = BrowserHelper;