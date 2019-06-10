// ------------- //
// request logic //
// ------------- //

import * as axios from 'axios';

export class Request {

  private baseUrl = 'http://www.datadt.com/api/data/';

  public constructor() {};

  /**
   * Builds and returns string for axios request to DataDT.com
   * @param currencyPair - Desired currency pairing (USD->CAD etc.)
   * @param resolution - Desired interval resolution (1min, 5min etc.)
   * @param beginDt - Begin date to gather data for (format: MM/DD/YYYY)
   * @param endDt - End date to gather data for (format: MM/DD/YYYY)
   * @returns Full axios request string
   */
  public async buildRequest(currencyPair, resolution, beginDt, endDt) {
    
  }





};