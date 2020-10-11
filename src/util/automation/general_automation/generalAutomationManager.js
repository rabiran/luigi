const searchInKartoffel = require('../../searchInKartoffel');
const logsAnalysis = require('./logsAnalysis');
const checkIfRecordExist = require('./checkIfRecordExist')

/**
 * activate all genearal automation
 * @param {String} personId - the person id (identityCard/personalNumber/domainUser)
 * @param {Array} logTitles - array of the logs titels
 * @param {object} kartoffelObj - object of the result from the kartoffel search
 * @param {object} kartingObj - object of the record from the karting search in the PNCY
 * @returns - object of { tempResArray (array of the info that we recived from the functions), personUpdates (the changes that have been made in kartoffel)}
 */
module.exports = async (idObj, logTitles, kartoffelObj, kartingObj) => {
    let { tempResArray, personUpdates} = await logsAnalysis(idObj, logTitles, kartoffelObj)
    tempResArray.push(await checkIfRecordExist(kartingObj))
    return { tempResArray, personUpdates };
}