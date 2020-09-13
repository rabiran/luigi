const config = require('../config/config')
const missingTags = require('./automation/city_automation/missingTags')
const generalAutomation = require('./automation/general_automation/generalAutomationManager')
const createLogFile = require('./createLogFile');
const upnCheck = require('./automation/ads_automation/upnCheck')
const sAMAccountCheck = require('./automation/adNN_automation/sAMAccountCheck')

/**
 * 
 * @param {Array} identifiersArray - array of the id objects
 * @param {String} dataSource - the data source of the objects
 * @param {String} runUID - the unique id of the run that we activated in karting
 * @param {Array} kartingObjArray - array of all of the data that we recived from karting
 * @param {array} kartoffelResultsArray - array of the results from the kartoffel search
 * @returns - the response ready for the user
 */
module.exports = async (identifiersArray, dataSource, kartingObjArray, kartoffelResultsArray) => {
    let responseArray = [];
    for (idObj of identifiersArray) {
        let kartingObj = kartingObjArray.find(obj =>  obj.id == idObj.identityCard || obj.id == idObj.personalNumber || obj.id ==idObj.domainUser);
        let kartoffelObj = kartoffelResultsArray.find(
            obj =>  obj.identityCard == idObj.identityCard || obj.personalNumber == idObj.personalNumber || obj.domainUsers.find(obj => uniqueID == idObj.domainUser)
                );
        let { fileName, logs } = kartingObj.logsObj;
        let personId = kartingObj.id;
        
        let logTitles = logs.map(line => {
            return JSON.parse(line).title;
        })
        
        //general automation
        let { tempResArray, personUpdates} = await generalAutomation(idObj, logTitles, kartoffelObj, kartingObj);
        
        createLogFile(logs, fileName, kartingObj, personUpdates);

        switch (dataSource) {
            case config.dataSources.aka:
                break;
            case config.dataSources.es:
                break;
            case config.dataSources.ads:
                tempResArray.push(await upnCheck(personId, kartingObj.records));
                break;
            case config.dataSources.adNN:
                tempResArray.push(await sAMAccountCheck(personId, kartingObj.records));
                break;
            case config.dataSources.mdn:
            case config.dataSources.mm:
            case config.dataSources.lmn:
                break;
            case config.dataSources.city:
                tempResArray.push(await missingTags(logTitles, personId));
                break;
            default:
        }
        tempResArray = tempResArray.filter(elem => !Array.isArray(elem) || elem.length > 0)
        if( tempResArray.length == 0 ) responseArray.push({ id: personId, info: `there is no proplem thet we can identefy with the person.`});
        else responseArray.push({ id: personId, info: tempResArray.flat() });
    }
    return responseArray;
}
