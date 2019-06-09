"use strict";
// -------------- //
// database logic //
// -------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const Main = require("./main");
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
                Main.default.sendToRenderer('test', 'fail');
            }
            else {
                console.log('success');
                Main.default.sendToRenderer('test', 'success');
            }
        });
    }
    ;
}
exports.Database = Database;
;
//# sourceMappingURL=database.js.map