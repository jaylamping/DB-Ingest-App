// -------------- //
// database logic //
// -------------- //

import * as Main from './main';
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
        Main.default.sendToRenderer('test', 'fail');
      } else {
        console.log('success');
        Main.default.sendToRenderer('test', 'success');      
      }
    });
  };

};