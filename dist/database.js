"use strict";
// -------------- //
// database logic //
// -------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
class Database {
    constructor() {
        this.mongoClient = mongodb.mongoClient;
    }
    ;
}
exports.Database = Database;
;
//# sourceMappingURL=database.js.map