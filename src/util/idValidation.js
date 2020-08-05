const validator = require("../config/validators");

module.exports = (personIDsArray) => {
    let isValid = true;
    let resArray = [];
    personIDsArray.forEach(async (idObj) => {
        if (idObj.identityCard != undefined && !validator(idObj.identityCard).identityCard) {
            resArray.push(`${idObj.identityCard}:  this field is incorrect\n`);
            isValid = false;
        }
        if (idObj.personalNumber != undefined && !validator(idObj.personalNumber).personalNumber) {
            resArray.push(`${idObj.personalNumber}:  this field is incorrect\n`);
            isValid = false;
        }
    });
    return { isValid, resArray }
};
