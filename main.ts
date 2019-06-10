// ------------ //
// main process //
// ------------ //

import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { Request } from './request';
import { Database } from './database';
import * as url from 'url';
import * as path from 'path';

let mainWindow;
let settingsWindow;
let db = new Database;
let request = new Request;

let dbName;
let dbUrl;
let dbPort;

console.log(app.getPath('userData'));

function onReady() {
  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 500,
    width: 500,
    minHeight: 700,
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
  // smooth opening animation
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })
  // build main menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
};

function onClose() {
  mainWindow.on("closed", () => {
    // dereference main window object when window is closed
    mainWindow = null;
    app.quit();
  
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

// ipc listeners
ipcMain.on('test-db-connection', (event, arg) => {
  db.testConnection(arg.url, arg.port, arg.name);
});

ipcMain.on('db-info', (event, arg) => {
  dbName = arg.name,
  dbPort = arg.port,
  dbUrl = arg.url
  settingsWindow.close();
});

ipcMain.on('test', () => {
  console.log(dbName);
  console.log(dbPort);
  console.log(dbUrl);
});

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
