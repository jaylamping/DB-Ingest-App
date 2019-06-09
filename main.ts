// ------------ //
// main process //
// ------------ //

import { app, BrowserWindow, Menu } from 'electron';
import { Request } from './request';
import { Database } from './database';
import * as url from 'url';
import * as path from 'path';

export default class Main {

  static mainWindow;
  static settingsWindow;
  static db = new Database;
  static request = new Request;

  private static onReady() {
    Main.mainWindow = new BrowserWindow({ width: 500, height: 700});
    Main.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "../main.html"),
        protocol: "file:",
        slashes: true
      })
    );
    // build main menu
    const mainMenu = Menu.buildFromTemplate(Main.menuTemplate);
    Menu.setApplicationMenu(mainMenu);
  };

  private static onClose() {
    Main.mainWindow.on("closed", () => {
      // dereference main window object when window is closed
      Main.mainWindow = null;
    });
  };

  private static createSettingsWindow() {
    Main.settingsWindow = new BrowserWindow({width: 400, height: 600});
    Main.settingsWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../settings.html'),
      protocol: 'file:',
      slashes: true
    }));
    Main.settingsWindow.removeMenu();
  };

  /**
   * Sends data to renderer process
   * @param channel - Desired channel to send data across
   * @param data - Data to be sent
   */
  public static sendToRenderer(channel, data) {
    Main.settingsWindow.webContents.send(channel, data);
  };

  /**
   * Main logic for application
   * @param app - App object from Electron
   */
  static main(app) {
    app.on('ready', Main.onReady);
    app.on('window-all-closed', Main.onClose);
  }

  static menuTemplate = [
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
            Main.mainWindow.openDevTools({mode: 'undocked'});
          },
          accelerator: process.platform == 'darwin' ? 'Command+I' : 'CTRL+I'
        }
      ]
    }
  ];
};

Main.main(app);

// let temp = db.testConnection('localhost', 27017, 'forex_pairs');
// console.log(temp);

