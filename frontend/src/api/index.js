import axios from "axios"
const BASE_URL="http://192.168.0.4:4000/api"

async function getVideo(url) {

}

async function getVideos() {
    return await apiCall("get", "/videos/")
}

async function apiCall(method, path) {
    let request = await axios[method](BASE_URL + path)

    return request.data
}

export default getVideos