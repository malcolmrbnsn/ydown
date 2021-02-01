import axios from "axios"
const BASE_URL="/api"

/**
 * Makes a call to the backend API
 * @param {String} method 
 * @param {String} path 
 */
async function apiCall(method, path, data) {
    try {
        let request = await axios[method](BASE_URL + path, data)

        return request.data
    } catch (error) {
        throw error
    }
}

export default apiCall
