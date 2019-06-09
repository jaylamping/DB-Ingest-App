// ------------ //
// main process //
// ------------ //

import { app, BrowserWindow, Menu } from 'electron';
import { Request } from './request';
import { Database } from './database';
import * as url from 'url';
import * as path from 'path';

// temp change again

let win;

app.on("ready", () => {
  win = new BrowserWindow({ width: 500, height: 700});
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../main.html"),
      protocol: "file:",
      slashes: true
    })
  );
  win.on("closed", () => {
    // dereference main window object when window is closed
    win = null;
  });

  // build menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

/**
 * Create database settings window
 */
function createSettingsWindow() {
  let settingsWindow = new BrowserWindow({width: 400, height: 600});
  settingsWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../settings.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const menuTemplate = [
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
          win.toggleDevTools();
        },
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'CTRL+I'
      }
    ]
  }
];

