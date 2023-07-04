const { exec } = require('child_process');

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
    return CommandHelper.executeCommand(`wmic product where name="${applicationName}" call uninstall`);
  }
}

module.exports = CommandHelper;