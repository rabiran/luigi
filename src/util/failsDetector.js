const config = require('../config/config')
const cityCheck = require('./automation/city_automation/missingTags')
const generalAutomation = require('./automation/general_automation/automationManager')
const collectLogs = require('./collectLogs')
const copyFile = require('./copyFile');
const moment = require('moment');

module.exports = async (identifiersArray, dataSource, runUID, recordsArray) => {
    let responseArray = [];
    const date = moment(new Date()).format("YYYY-MM-DD");
    for (idObj of identifiersArray) {
        let personId = idObj.identityCard || idObj.personalNumber || idObj.domainUser;
        let { logTitles, fileName } = await collectLogs(idObj, runUID, date);
        copyFile(`${config.logsPath}/${date}/${fileName}`, `log/karting_logs/${date}/`, fileName);

        //general automation
        let tempResArray = await generalAutomation(personId, logTitles, recordsArray);

        switch (dataSource) {
            case config.dataSources.aka:
                break;
            case config.dataSources.es:
                break;
            case config.dataSources.ads:
                break;
            case config.dataSources.adNN:
                break;
            case config.dataSources.mdn:
            case config.dataSources.mm:
            case config.dataSources.lmn:
                break;
            case config.dataSources.city:
                tempResArray.push(await cityCheck( logTitles, personId ));
                break;
            default:
        }
        if( tempResArray.length == 0 ) responseArray.push({ id: personId, info: `there is no proplem thet we can identefy with the person.`});
        else responseArray.push({ id: personId, info: tempResArray });
    }
    return responseArray;
}
