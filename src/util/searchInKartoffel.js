const axios = require('axios');
const https = require('https');
const config = require('../config/config')
const getTokenCreator = require("spike-get-token");
const getToken = getTokenCreator(config.getTokenIntilize);

const httpsAgent = new https.Agent({rejectUnauthorized: false});
const axiosInstance = axios.create({httpsAgent});

/**
 * 
 * @param {object} idObj - the object of the id's that we have recieved from the user
 * @returns- if the person exist in kartoffel - {data: (object), existInKartoffel: true}. if not {message: (string), existInKartoffel: false}
 */
module.exports = async (idObj) => {
    axiosInstance.defaults.headers.common['Authorization'] = await getToken();
    let returnedObj;
    let id =  idObj.identityCard || idObj.personalNumber || idObj.domainUser;
    if(idObj.identityCard || idObj.personalNumber){       
        returnedObj = await axiosInstance.get(`${config.kartoffelUrl}/api/persons/identifier/${id}`).catch(err => {
            console.log('INFO: '+ err.message);
        })
    } else if(idObj.domainUser){
        returnedObj = await axiosInstance.get(`${config.kartoffelUrl}/api/persons/domainUser/${idObj.domainUser}`).catch(err => {
            console.log('INFO: '+ err.message);
        })
    }
    if (returnedObj && returnedObj.status == 200) {
        return { id: id, data: returnedObj.data ,existInKartoffel: true };
    } else { 
        return { id: id, message: `the person doesn't exist in kartoffel`, existInKartoffel: false };
    }
}