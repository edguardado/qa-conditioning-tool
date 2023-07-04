const { exec } = require('child_process');

class CommandHelper {
    constructor() {
      
    }
  async uninstallApplication(applicationName) {
    return new Promise((resolve, reject) => {
      const command = `wmic product where name="${applicationName}" call uninstall`;

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
}

module.exports = CommandHelper;