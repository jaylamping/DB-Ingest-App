"use strict";
// ------------ //
// main process //
// ------------ //
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const url = require("url");
const path = require("path");
// temp change
let win;
electron_1.app.on("ready", () => {
    win = new electron_1.BrowserWindow({ width: 500, height: 700 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../main.html"),
        protocol: "file:",
        slashes: true
    }));
    win.on("closed", () => {
        // dereference main window object when window is closed
        win = null;
    });
    // build menu
    const mainMenu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(mainMenu);
});
/**
 * Create database settings window
 */
function createSettingsWindow() {
    let settingsWindow = new electron_1.BrowserWindow({ width: 400, height: 600 });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../settings.html'),
        protocol: 'file:',
        slashes: true
    }));
}
;
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "About"
            },
            {
                label: "Exit",
                click() {
                    electron_1.app.quit();
                }
            }
        ]
    },
    {
        label: "Database",
        submenu: [
            {
                label: "Settings",
                click() {
                    createSettingsWindow();
                }
            }
        ]
    }
];
//# sourceMappingURL=main.js.map