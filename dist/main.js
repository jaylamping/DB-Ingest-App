"use strict";
// ------------ //
// main process //
// ------------ //
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const request_1 = require("./request");
const database_1 = require("./database");
const url = require("url");
const path = require("path");
var mainWindow;
exports.mainWindow = mainWindow;
var settingsWindow;
let db = new database_1.Database;
let request = new request_1.Request;
let temp = db.testConnection('localhost', 27017, 'forex_pairs');
console.log(temp);
function onReady() {
    exports.mainWindow = mainWindow = new electron_1.BrowserWindow({ width: 500, height: 700 });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../main.html"),
        protocol: "file:",
        slashes: true
    }));
    // build main menu
    const mainMenu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(mainMenu);
}
;
function onClose() {
    mainWindow.on("closed", () => {
        // dereference main window object when window is closed
        exports.mainWindow = mainWindow = null;
    });
}
;
function createSettingsWindow() {
    settingsWindow = new electron_1.BrowserWindow({ width: 400, height: 600 });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../settings.html'),
        protocol: 'file:',
        slashes: true
    }));
    settingsWindow.removeMenu();
}
;
/**
 * Main logic for application
 * @param app - App object from Electron
 */
function main() {
    electron_1.app.on('ready', onReady);
    electron_1.app.on('window-all-closed', onClose);
}
let menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'About'
            },
            {
                label: 'Exit',
                click() {
                    electron_1.app.quit();
                },
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'CTRL+Q'
            }
        ]
    },
    {
        label: 'Database',
        submenu: [
            {
                label: 'Settings',
                click() {
                    createSettingsWindow();
                    settingsWindow.webContents.openDevTools({ mode: 'undocked' });
                }
            }
        ]
    },
    {
        label: 'Debug',
        submenu: [
            {
                label: 'Dev Tools',
                click() {
                    mainWindow.openDevTools({ mode: 'undocked' });
                },
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'CTRL+I'
            }
        ]
    }
];
main();
//# sourceMappingURL=main.js.map