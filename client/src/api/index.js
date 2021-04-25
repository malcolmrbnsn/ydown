import axios from "axios"
const BASE_URL="/api"

/**
 * Makes a call to the backend API
 * @param {string} HTTP get method 
 * @param {string} path from the base url 
 * @param {Object} data
 * @returns {{isLoggedIn: boolean, user: {email: string, username: string, _id: string}}} data to send
 */
function apiCall(method, path, data={}) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](BASE_URL + path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.error);
      });
  });
}



export default apiCall
