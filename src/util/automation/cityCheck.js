const logDetails = require('../logDetails');
const fs = require('fs');

module.exports = async (logs, personId) => {
    let areTagsMissing = false;
    for (title of logs) {
        if (title == logDetails.warn.WRN_IRRELEVANT_TAGS) {
            areTagsMissing = true;
            return `the person with the id ${personId} does not have the necessary tags.`
        }
    }
    
    if (!areTagsMissing && logs.length > 0) {
        fs.appendFileSync('luigiLogs.txt', `${personId}: the logs are- ${logs}`);
        return `there is a proplem thet we can't identefy with the peerson of this id - ${personId}.`
    }
}
