const { default: axios } = require("axios");
require('dotenv').config();

async function GetDevices(token) {
    // get device with api key 
    const response = await axios({
        method: 'get',
        url: process.env.CLIENT_SERVER + '/api/devices',
        responseType: 'json',
        headers: {
            token: token
        }
    })
    // return response body
    return response.data
}

async function GetAllDevices() {
    // get all data with method get 
    const response = await axios({
        method: 'get',
        url: process.env.CLIENT_SERVER + '/api/2198941158',
        responseType: 'json',
        headers: {
            token: process.env.TOKEN
        }
    })
    // return response body
    return response.data
}

async function UpdateDevices(token, value) {
    // updating data with put metohd , update auth_status only 
    const response = await axios.put(process.env.CLIENT_SERVER + '/api/devices', {
            auth_status: value,
        }, {
            headers: {
                token: token
            }
        })
        // return response body
    return response.data
}

GetAllDevices().then(result => { 
    console.log(result)
})

module.exports = { GetAllDevices, UpdateDevices, GetDevices }