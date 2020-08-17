const logDetails = require('../../logDetails');
const fs = require('fs');

module.exports = async (logs, personId) => {
    let areTagsMissing = false;
    for (title of logs) {
        if (title == logDetails.warn.WRN_IRRELEVANT_TAGS) {
            areTagsMissing = true;
            return `the person does not have the necessary tags.`
        }
    }
    
    if (!areTagsMissing && logs.length > 0) {
        return `there is a proplem thet we can't identefy with this peerson.`
    }
}
