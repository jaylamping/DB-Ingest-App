"use strict";
// ------------- //
// request logic //
// ------------- //
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    constructor() {
        this.baseUrl = 'http://www.datadt.com/api/data/';
    }
    ;
    /**
     * Builds and returns string for axios request to DataDT.com
     * @param currencyPair - Desired currency pairing (USD->CAD etc.)
     * @param resolution - Desired interval resolution (1min, 5min etc.)
     * @param beginDt - Begin date to gather data for (format: MM/DD/YYYY)
     * @param endDt - End date to gather data for (format: MM/DD/YYYY)
     * @returns Full axios request string
     */
    async buildRequest(currencyPair, resolution, beginDt, endDt) {
    }
}
exports.Request = Request;
;
//# sourceMappingURL=request.js.map