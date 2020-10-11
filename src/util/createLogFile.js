const fs = require("fs");
const config = require('../config/config');
const moment = require('moment');
const createPath = require('../util/createPath')

/**
 * copy the logs from karting to our logs folder
 * 
 * @param {String} logData - the path of the source folder
 * @param {String} fileName - the name of the file
 * @param {String} record - the path of the destination folder
 * @param {object} personUpdates - the updates that have been made in kartoffel
 */
module.exports = (logData, fileName, record, personUpdates) => {
	const date = moment(new Date()).format("YYYY-MM-DD");
	if(fileName) {
		let destFolder = `${config.kartingLogsFolderPath}/${date}/`;		
		createPath(destFolder);

		const filePrintedData = {
			logs: logData,
			record: record.records,
			personUpdates: personUpdates,
		}
		fs.writeFileSync(`${destFolder}${fileName}`, JSON.stringify(filePrintedData), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log("INFO: the log file has been created");
			}
		});
	} else {
		let destFolder = `${config.luigiLogsFolderPath}/`;
		createPath(destFolder);
		
		if (!fs.existsSync(`${destFolder}${date}`)) {
			fs.closeSync(fs.openSync(`${destFolder}${date}`, 'w'));
		}
		fs.appendFile(`${destFolder}${date}`, JSON.stringify(logData) + ',', (err) => { 
			if (err) {
				console.error(err);
			} else {
				console.log("INFO: the new record is now saved");
			}
		});
	}
};
