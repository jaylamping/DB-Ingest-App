// -------------- //
// database logic //
// -------------- //

import { settingsWindow } from './main';
import * as mongodb from "mongodb";

export class Database {

  private mongoClient = mongodb.MongoClient;

  public constructor() {};

  /**
   * Checks for successful database connection based on parameters and returns result to renderer
   * @param url - DB url
   * @param port - DB port
   * @param name - DB name
   */
  public testConnection(url:String, port:Number, name:String) {
    let uri = `mongodb://${url}:${port}/${name}`; 
    this.mongoClient.connect(uri, {useNewUrlParser: true}, function(err, db) {
      if (err) {
        console.log('fail');
        settingsWindow.webContents.send('test-db-connection', false);
      } else {
        console.log('success'); 
        settingsWindow.webContents.send('test-db-connection', true);   
      }
    });
  };

  public testListener() {

  }

};