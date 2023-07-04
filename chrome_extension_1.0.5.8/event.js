'use strict';

function getPlatformInfo() {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.getPlatformInfo((platformInfo) => {
                resolve(platformInfo);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function terminate() {
    return new Promise((resolve) => {
        const tooltip = 'PrinterLogic Extension - This extension does not run on Chrome OS devices';
        chrome.browserAction.setIcon({
            path: {
                16: 'icon16grey.png',
                48: 'icon48grey.png',
                128: 'icon128grey.png',
            },
        });
        chrome.browserAction.setTitle({ title: tooltip });
        chrome.browserAction['disable'](() => {
            resolve();
        });
    });
}

async function validateEnv() {
    const { os } = await getPlatformInfo();
    if (os !== 'cros') return;
    await terminate();
    throw new Error('Invalid Environment, exiting extension');
}

(function () {
    validateEnv().then(function () {
        chrome.runtime.onConnect.addListener(function (portExtension) {
            portExtension.onMessage.addListener(function (messageExtension) {
                var portNative = chrome.runtime.connectNative('com.printerlogic.host.native.client');
                var onMessageCalled = false;
                portNative.onDisconnect.addListener(function () {
                    if (onMessageCalled) {
                        return;
                    }
                    var message = 'Could not communicate with the PrinterLogic client. It may not be installed or running.';
                    portExtension.postMessage({
                        state: 'error',
                        message: message,
                        id: messageExtension.id
                    });
                    var error = chrome.runtime.lastError;  
                    if (error) console.log(error);
                });
                portNative.onMessage.addListener(function (messageNative) {
                    onMessageCalled = true;
                    portExtension.postMessage({
                        state: messageNative.state,
                        message: messageNative.message,
                        id: messageExtension.id
                    });
                });
                portNative.postMessage({
                    command: messageExtension.command,
                    parameters: messageExtension.parameters
                });
            });
        });
    });
    chrome.runtime.onInstalled.addListener(function () {
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var id = tabs[i].id;
                var url = tabs[i].url;
                if (!url) return;
                if (url.startsWith('chrome://') || url.startsWith('edge://')) return;
                chrome.tabs.executeScript(id, { 'file': 'jquery-2.1.4.min.js' }, function (id) {
                    return function () {
                        chrome.tabs.executeScript(id, { 'file': 'content.js' }, function(){});
                    }
                }(id));
            }
        });
    });
})();
