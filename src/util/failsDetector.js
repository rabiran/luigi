const config = require('../config/config')
const cityCheck = require('./automation/cityCheck')
const collectLogs = require('./collectLogs')
const fs = require('fs');

module.exports = async (identifiersArray, dataSource, runUID) => {
    let responseArray = [];
    for (idObj of identifiersArray) {
        let logsTitles = await collectLogs(idObj, runUID);
        // fs.copy('/tmp/mydir', '/tmp/mynewdir', function (err) {
        //     if (err) {
        //       console.error(err);
        //     } else {
        //       console.log("success!");
        //     }
        //   });

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
                responseArray.push(await cityCheck( logsTitles , idObj.identityCard ));
                break;
            default:
        }
    }
    return responseArray;
}
