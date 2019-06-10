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
let mainWindow;
let settingsWindow;
exports.settingsWindow = settingsWindow;
let db = new database_1.Database;
let request = new request_1.Request;
let dbName;
let dbUrl;
let dbPort;
console.log(electron_1.app.getPath('userData'));
function onReady() {
    mainWindow = new electron_1.BrowserWindow({
        show: false,
        minWidth: 500,
        width: 500,
        minHeight: 700,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../main.html"),
        protocol: "file:",
        slashes: true
    }));
    // smooth opening animation
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    // build main menu
    const mainMenu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(mainMenu);
}
;
function onClose() {
    mainWindow.on("closed", () => {
        // dereference main window object when window is closed
        mainWindow = null;
        electron_1.app.quit();
    });
}
;
function createSettingsWindow() {
    exports.settingsWindow = settingsWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../settings.html'),
        protocol: 'file:',
        slashes: true
    }));
    settingsWindow.removeMenu();
}
;
// ipc listeners
electron_1.ipcMain.on('test-db-connection', (event, arg) => {
    db.testConnection(arg.url, arg.port, arg.name);
});
electron_1.ipcMain.on('db-info', (event, arg) => {
    dbName = arg.name,
        dbPort = arg.port,
        dbUrl = arg.url;
    settingsWindow.close();
});
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