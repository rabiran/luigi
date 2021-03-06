const validator = require("../config/validators");

/**
 * 
 * @param {Array} personIDsArray - object of { identityCard, personalNumber }
 * @returns - object of isValid(bool) and resArray(details fo the problem)
 */
module.exports = (personIDsArray) => {
    let isValid = true;
    let resArray = [];
    personIDsArray.forEach(async (idObj) => {
        if( idObj.identityCard == undefined && idObj.personalNumber && idObj.domainUser == undefined){
            resArray.push(`there isn't any valid input for this object- ${JSON.stringify(idObj)}`);
            isValid = false;
        }
        if (idObj.identityCard != undefined && !validator(idObj.identityCard).identityCard) {
            resArray.push(`${idObj.identityCard}:  this field is incorrect`);
            isValid = false;
        }
        if (idObj.personalNumber != undefined && !validator(idObj.personalNumber).personalNumber) {
            resArray.push(`${idObj.personalNumber}:  this field is incorrect`);
            isValid = false;
        }
    });
    return { isValid, resArray }
};
