import axios from "axios"
const BASE_URL="http://192.168.0.4:4000/api"

/**
 * Makes a call to the backend API
 * @param {String} method 
 * @param {String} path 
 */
async function apiCall(method, path) {
    try {
        let request = await axios[method](BASE_URL + path)

        return request.data
    } catch (error) {
        throw error
    }
}

export default apiCall