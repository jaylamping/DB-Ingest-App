// ------------ //
// main process //
// ------------ //

import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { Request } from './request';
import { Database } from './database';
import * as url from 'url';
import * as path from 'path';

var mainWindow;
var settingsWindow;
let db = new Database;
let request = new Request;

function onReady() {
  mainWindow = new BrowserWindow({ 
    width: 500, 
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }  
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../main.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // build main menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
};

function onClose() {
  mainWindow.on("closed", () => {
    // dereference main window object when window is closed
    mainWindow = null;
  
  });
};

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
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
};

ipcMain.on('test-connection', (event, arg) => {
  db.testConnection(arg.url, arg.port, arg.name);
})

/**
 * Main logic for application
 * @param app - App object from Electron
 */
function main() {
  app.on('ready', onReady);
  app.on('window-all-closed', onClose);
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
          app.quit();
        },
        accelerator: process.platform == 'darwin' ? 'Command+Q' :'CTRL+Q'
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
          settingsWindow.webContents.openDevTools({mode: 'undocked'});
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
          mainWindow.openDevTools({mode: 'undocked'});
        },
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'CTRL+I'
      }
    ]
  }
];

main();

export { settingsWindow };
