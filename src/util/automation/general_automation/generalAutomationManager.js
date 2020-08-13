const searchInKartoffel = require('../../searchInKartoffel');
const logsAnalysis = require('./logsAnalysis')

/**
 * activate all genearal automation
 * @param {String} personId - the person id (identityCard/personalNumber/domainUser)
 * @param {Array} logTitles - array of the logs titels
 * @returns - array of the info we inforomed from the function we activate
 */
module.exports = async (idObj, logTitles) => {
    let person = await searchInKartoffel(idObj);
    let resArray = [];
    if(!person.existInKartoffel) {
        resArray.push(person.message);
    }
    else{
        resArray.push(await logsAnalysis(logTitles));
    }
    return resArray;
}