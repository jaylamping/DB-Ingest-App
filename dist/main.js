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
class Main {
    static onReady() {
        Main.mainWindow = new electron_1.BrowserWindow({ width: 500, height: 700 });
        Main.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "../main.html"),
            protocol: "file:",
            slashes: true
        }));
        // build main menu
        const mainMenu = electron_1.Menu.buildFromTemplate(Main.menuTemplate);
        electron_1.Menu.setApplicationMenu(mainMenu);
    }
    ;
    static onClose() {
        Main.mainWindow.on("closed", () => {
            // dereference main window object when window is closed
            Main.mainWindow = null;
        });
    }
    ;
    static createSettingsWindow() {
        Main.settingsWindow = new electron_1.BrowserWindow({ width: 400, height: 600 });
        Main.settingsWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../settings.html'),
            protocol: 'file:',
            slashes: true
        }));
        Main.settingsWindow.removeMenu();
    }
    ;
    /**
     * Sends data to renderer process
     * @param channel - Desired channel to send data across
     * @param data - Data to be sent
     */
    static sendToRenderer(channel, data) {
        Main.settingsWindow.webContents.send(channel, data);
    }
    ;
    /**
     * Main logic for application
     * @param app - App object from Electron
     */
    static main(app) {
        app.on('ready', Main.onReady);
        app.on('window-all-closed', Main.onClose);
    }
}
Main.db = new database_1.Database;
Main.request = new request_1.Request;
Main.menuTemplate = [
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
                    Main.createSettingsWindow();
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
                    Main.mainWindow.openDevTools({ mode: 'undocked' });
                },
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'CTRL+I'
            }
        ]
    }
];
exports.default = Main;
;
Main.main(electron_1.app);
// let temp = db.testConnection('localhost', 27017, 'forex_pairs');
// console.log(temp);
//# sourceMappingURL=main.js.map