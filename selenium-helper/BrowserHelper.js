
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

        await browser.Browser.switchToMainWindow();
        await browser.Browser.waitForElement("xpath", "//input[contains(@value, 'My Company')]")
        //const myCompany = await browser.Browser.getElement("xpath", "//input[contains(@value, 'My Company')]")
        
        await browser.Browser.close();
       
    }

    async addServiceClientLdap(){

        console.log("addServiceClientLdap");


        //await browser.Browser.click("id", "gear-return-button")

        await browser.Browser.waitForElement("id", "newfolder")
        await browser.Browser.click("id", "newfolder")
        await browser.Browser.waitForElement("id", "popupitem-servicehost")
        await browser.Browser.click("id", "popupitem-servicehost")
        await browser.Browser.waitForElement("id", "service-host-name")
        const serviceHostName = await browser.Browser.getElement("id", "service-host-name")
        await browser.Browser.setValue(serviceHostName, 'LDAP Service client')
        const serviceIP = await browser.Browser.getElement("id", "service-host-ip")
        await browser.Browser.setValue(serviceIP, '10.150.4.245')

        await browser.Browser.click("xpath", "//button[contains(text(), 'Add Service Client')]")

        await browser.Browser.waitForElement("id", "sh-identity-sync")
        await browser.Browser.click("id", "sh-identity-sync")
        
        await browser.Browser.waitForElement("id", "identity-sync-ldap-enabled-checkmark")
        await browser.Browser.click("id", "identity-sync-ldap-enabled-checkmark")

        await browser.Browser.waitForElement("id", "identity-setting-save")
        await browser.Browser.click("id", "identity-setting-save")

        await browser.Browser.close();
        
        

    }

    async setLdap(){

        await browser.Browser.waitForElement("id", "gear-menu")
        await browser.Browser.click("id", "gear-menu")
        await browser.Browser.waitForElement("id", "settings-link")
        await browser.Browser.click("id", "settings-link")

        await browser.Browser.waitForElement("id", "cTCPIPPrinter")
        await browser.Browser.click("id", "cTCPIPPrinter")

        

        await browser.Browser.waitForElement("id", "ldapsettings_addrowbtn")

      
        await browser.Browser.click("id", "ldapsettings_addrowbtn")

        await browser.Browser.waitForElement("id", "bind_password")

        //fill ldap form

         const dnsName = await browser.Browser.getElement("id", "dns_name")
         const biosName = await browser.Browser.getElement("id", "netbios_name")
         const baseDn = await browser.Browser.getElement("id", "base_dn")
         const primaryLdap = await browser.Browser.getElement("id", "primary_ldap")
         const primaryLdapInternal = await browser.Browser.getElement("id", "primary_ldap_internal")
         const secondaryLddap = await browser.Browser.getElement("id", "secondary_ldap")
         const secureCheckMark = await browser.Browser.getElement("id", "requires_secure_checkmark")
         const domainAlias = await browser.Browser.getElement("id", "domain_dns_alias")
         const bindUser = await browser.Browser.getElement("id", "bind_user")
         const bindPassword = await browser.Browser.getElement("id", "bind_password")
         const defaultDomainSelect = await browser.Browser.getElement("id", "ldap_auth_default")
      



         await browser.Browser.setValue(biosName, 'printerlogic')
         await browser.Browser.setValue(dnsName, 'printerlogic.local')
        
         await browser.Browser.setValue(primaryLdap, '54.177.223.207')
         await browser.Browser.setValue(primaryLdapInternal, '10.151.0.4')
         await browser.Browser.setValue(secondaryLddap, '192.168.3.70')
         await browser.Browser.click("id", "requires_secure_checkmark")
         await browser.Browser.setValue(domainAlias, 'printerlogic.local')
         await browser.Browser.setValue(bindUser, 'ptest@printerlogic.local')
         await browser.Browser.setValue(bindPassword, 'pt12345')
         await browser.Browser.click("xpath", "//button[contains(text(), 'Apply')]")
         await browser.Browser.click("id", "ntcs_apply")

        
        // // set default domain
         await browser.Browser.waitForElement("id", "ldap_auth_default")
         await browser.Browser.click('id', 'ldap_auth_default')
         await browser.Browser.waitForElement("xpath", "//select[@id = 'ldap_auth_default']/option[2]")
         await browser.Browser.click("xpath", "//select[@id = 'ldap_auth_default']/option[2]")
         await browser.Browser.click("id", "ntcs_apply")
        
        
        await browser.Browser.waitForElement("id", "ntcs_apply")
        await browser.Browser.waitForElement("id", "ldap_auth_default")
        await browser.Browser.close();

        //this.addServiceClientLdap();


    }

    async login(host){


        await browser.Browser.openPage("https://"+host+"/admin")
         const rootUser = await browser.Browser.getElement("id", "relogin_user")
         const passwordField = await browser.Browser.getElement("id", "relogin_password")
        

        
        await browser.Browser.setValue(rootUser, 'root')
        await browser.Browser.setValue(passwordField, 'password1')
        await browser.Browser.click("id", "admin-login-btn")
        



        //gear-menu



    }

}

module.exports = BrowserHelper;