const config = require('../config/config')
const cityCheck = require('./automation/city_automation/missingTags')
const generalAutomation = require('./automation/generalAutomation')
const collectLogs = require('./collectLogs')
const copyFile = require('./copyFile');
const moment = require('moment');

module.exports = async (identifiersArray, dataSource, runUID) => {
    let responseArray = [];
    const date = moment(new Date()).format("YYYY-MM-DD");
    for (idObj of identifiersArray) {
        let personId = idObj.identityCard || idObj.personalNumber || idObj.domainUser;
        let { logTitles, fileName } = await collectLogs(idObj, runUID, date);
        copyFile(`${config.logsPath}/${date}/${fileName}`, `log/karting_logs/${date}/`, fileName);

        //general automation
        let tempResArray = await generalAutomation(personId, logTitles);

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
        if( tempResArray == [] ) responseArray.push(`there is a proplem thet we can't identefy with the peerson.`);
        else responseArray.push({ id: personId, info: tempResArray });
    }
    return responseArray;
}
