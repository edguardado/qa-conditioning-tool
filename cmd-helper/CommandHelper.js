const { exec } = require('child_process');
const browser = require('pl-aut-web-fw');
const robot = require('robotjs');

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

  async installClient(instance, authcode) {
    let EXTENSION_PATH = "C:\\Users\\eduardo.guardado\\data\\projects\\qa-conditioning-tool\\chrome_extension_1.0.5.8";
    if (!EXTENSION_PATH) {
      const RELATIVE_PATH = path.relative(
        __filename,
        "chrome_extension_1.0.5.8"
      );
      EXTENSION_PATH = path.join(__filename, RELATIVE_PATH);
    }

    await browser.Browser.setOptions({
      args: [
        "--disable-logging",
        "--disable-notifications",
        "--ignore-certificate-errors-spki-list",
        "--ignore-certificate-errors",
        "---ignore-ssl-errors",
        "--start-maximized",
        `load-extension=${EXTENSION_PATH}`,
      ],
    });

    await browser.Browser.openPage("https://"+instance);
    await this.runApplication("C:\\Users\\eduardo.guardado\\Downloads\\PrinterInstallerClientSetup.exe")

  }

  async runApplication(appPath) {
    return this.executeCommand(`"${appPath}"`);
  }

  async clickCenter(){

    // Get the screen size
const screenSize = robot.getScreenSize();
const screenWidth = screenSize.width;
const screenHeight = screenSize.height;

// Calculate the center coordinates
const centerX = Math.floor(screenWidth / 2);
const centerY = Math.floor(screenHeight / 2);

// Move the mouse to the center of the screen
robot.moveMouse(centerX, centerY);

// Perform a mouse click
robot.mouseClick();
  }

  }

module.exports = CommandHelper;