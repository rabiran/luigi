const logDetails = require('../logDetails');

module.exports = async (logs, personId) => {
    let areTagsMissing = false;
    for (title of logs) {
        if (title == logDetails.warn.WRN_IRRELEVANT_TAGS) {
            areTagsMissing = true;
            return `the person with the id ${personId} does not have the necessary tags.`
        }
    }
    
    if (!areTagsMissing) {
        fs.appendFileSync('luigiLogs.txt', `${personId}: the logs are- ${logs}`);
        return `there is a proplem thet we can't identefy with the peerson of this id - ${personId}.`
    }
}
