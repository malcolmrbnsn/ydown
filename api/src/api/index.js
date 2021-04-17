import axios from "axios"
const {API_URL} = process.env

/**
 * Makes a call to the backend API
 * @param {String} method 
 * @param {String} path 
 */
async function apiCall(method, path, data) {
    try {
        let request = await axios[method](API_URL + ":" + API_PORT + "/api/" + path, data)

        return request.data
    } catch (error) {
        throw error
    }
}

export default apiCall
