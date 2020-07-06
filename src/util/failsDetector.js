const config = require('../config/config')
const cityCheck = require('./automation/cityCheck')
const collectLogs = require('./collectLogs')
const copyFile = require('./copyFile')

module.exports = async (identifiersArray, dataSource, runUID) => {
    let responseArray = [];
    for (idObj of identifiersArray) {
        let {logTitles, fileName} = await collectLogs(idObj);
        copyFile(`${config.logsPath}/${fileName}`, `logs/${fileName}`);
        //TODO general automation

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
                responseArray.push(await cityCheck( logTitles , idObj.identityCard ));
                break;
            default:
        }
    }
    return responseArray;
}
