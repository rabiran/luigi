const config = require('../config/config')
const cityCheck = require('./automation/cityCheck')
const collectLogs = require('./collectLogs')

module.exports = async (identifiersArray, dataSource) => {
    let logsTitles = await collectLogs(identifiersArray);
    let responseArray;
    for (id of identifiersArray) {

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
                responseArray.push(cityCheck( logsTitles , id ));
                break;
            default:
        }
    }
    return responseArray;
}
