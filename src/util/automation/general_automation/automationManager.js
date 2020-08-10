const searchInKartoffel = require('../../searchInKartoffel');
const logsAnalysis = require('./logsAnalysis')

/**
 * activate all genearal automation
 * @param {String} personId - the person id (identityCard/personalNumber/domainUser)
 * @param {Array} logTitles - array of the logs titels
 * @param {Array} recordsArray - all of the records of the people from the data source
 */
module.exports = async (personId, logTitles, recordsArray) => {
    let person = await searchInKartoffel(personId);
    if(!person.existInKartoffel) 
        return person.messege;
    else{
        let resArray = [];
        resArray.push(await logsAnalysis(logTitles));
        
        
        return resArray;
    }
}