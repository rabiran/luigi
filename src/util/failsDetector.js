const config = require('../config/config')
const missingTags = require('./automation/city_automation/missingTags')
const generalAutomation = require('./automation/general_automation/generalAutomationManager')
const collectLogs = require('./collectLogs')
const copyFile = require('./copyFile');
const moment = require('moment');
const upnCheck = require('./automation/general_automation/upnCheck')

/**
 * 
 * @param {Array} identifiersArray - array of the id objects
 * @param {String} dataSource - the data source of the objects
 * @param {String} runUID - the unique id of the run that we activated in karting
 * @param {Array} recordsArray - array of all of the records of the people from the data source
 * @returns - the resonse ready for the user
 */
module.exports = async (identifiersArray, dataSource, runUID, recordsArray) => {
    let responseArray = [];
    const date = moment(new Date()).format("YYYY-MM-DD");
    for (idObj of identifiersArray) {
        let personId = idObj.identityCard || idObj.personalNumber || idObj.domainUser;
        let { logTitles, fileName } = await collectLogs(idObj, runUID, date);
        copyFile(`${config.logsPath}/${date}/${fileName}`, `log/karting_logs/${date}/`, fileName);

        //general automation
        let tempResArray = await generalAutomation(idObj, logTitles);

        switch (dataSource) {
            case config.dataSources.aka:
                break;
            case config.dataSources.es:
                break;
            case config.dataSources.ads:
                tempResArray.push(await upnCheck(personId, recordsArray ));
                break;
            case config.dataSources.adNN:
                tempResArray.push(await upnCheck(personId, recordsArray));
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
