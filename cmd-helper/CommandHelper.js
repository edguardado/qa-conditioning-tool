const { exec } = require('child_process');
const browser = require('pl-aut-web-fw');


class CommandHelper {
    constructor() {
      
    }

async executeCommand(command) {
        return new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              reject(`Error: ${error.message}`);
              return;
            }
            if (stderr) {
              reject(`Command execution error: ${stderr}`);
              return;
            }
            resolve(stdout);
          });
        });
      }
    
  async uninstallApplication(applicationName) {
    return this.executeCommand(`wmic product where name="${applicationName}" call uninstall`);
  }

  async deleteFolder(folderPath) {
    return this.executeCommand(`rmdir /s /q "${folderPath}"`);
  }

  async installClient(instance) {
    await browser.Browser.openPage("https://"+instance);

  }
}

module.exports = CommandHelper;