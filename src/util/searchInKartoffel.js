const axios = require('axios');
const https = require('https');
const config = require('../config/config')

const httpsAgent = new https.Agent({rejectUnauthorized: false});
axios.defaults.headers.common['Authorization'] = ''/* spike token */;
const axiosInstance = axios.create({httpsAgent});

module.exports = async (id) => {
    let returnedObj = await axiosInstance.get(`${config.kartoffelUrl}/api/persons/identifier/${id}`).catch(err => {
        console.log('INFO: '+ err.message);
    })
    if (returnedObj && returnedObj.status == 200) {
        return { data: returnedObj.data ,existInKartoffel: true };
    } else { 
        return { messege: `the person doesn't exist in kartoffel`, existInKartoffel: false };
    }
}