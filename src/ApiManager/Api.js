/**
 * Created by Tega on 04/03/2018.
 */
import * as constant from 'helper/constants'

export default class Api {

  /**
   *
   * @param requestType
   * @param endPoint
   * @param headers
   * @param data
   * @returns {Promise}
   */
  request(requestType, endPoint, data, headers,) {
    let that = this;
    let url = constant.API_URL + endPoint;
    return (new Promise((resolve, reject) =>   {
      if (requestType === constant.POST) {
        resolve(that.post(url, data, headers));
      }else {
        let query = this._convertObjectToQueryParameters(data);
        resolve(that.get(url + query, headers));
      }
    }));
  }

  _convertObjectToQueryParameters(data) {
    return  "?" + Object.keys(data).map(function(prop) {
        return [prop, data[prop]].map(encodeURIComponent).join("=");
      }).join("&");
  }

  /**
   *
   * @param url
   * @param headers
   * @returns {Promise}
   */
  get(url, headers = {}) {
    return (new Promise((resolve, reject) => {
      let init = {
        method: 'GET',
        headers: headers,
      };
      fetch(url, init).then((response) => {
        console.log('get response', response);
        resolve(response.json());
      }).catch(exception => {
        reject(exception);
      });
    }));

  }

  /**
   *
   * @param url
   * @param data
   * @param headers
   * @returns {Promise}
   */
  post(url, data, headers = {Accept: 'application/json',  'Content-Type': 'application/x-www-form-urlencoded'}) {
    return (new Promise((resolve, reject)  => {
      let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      };
      fetch(url, init).then((response) => {
        resolve(response.json());
      }).catch(exception => {
        reject(exception);
      });
    }));
  }
}