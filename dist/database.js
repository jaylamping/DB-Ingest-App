"use strict";
// -------------- //
// database logic //
// -------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const mongodb = require("mongodb");
class Database {
    constructor() {
        this.mongoClient = mongodb.MongoClient;
    }
    ;
    /**
     * Checks for successful database connection based on parameters and returns result to renderer
     * @param url - DB url
     * @param port - DB port
     * @param name - DB name
     */
    testConnection(url, port, name) {
        let uri = `mongodb://${url}:${port}/${name}`;
        this.mongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                console.log('fail');
                main_1.settingsWindow.webContents.send('test-db-connection', false);
            }
            else {
                console.log('success');
                main_1.settingsWindow.webContents.send('test-db-connection', true);
            }
        });
    }
    ;
    testListener() {
    }
}
exports.Database = Database;
;
//# sourceMappingURL=database.js.map