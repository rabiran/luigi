const fs = require("fs");
const config = require('../config/config');
const moment = require('moment');

/**
 * copy the file of the logs from karting to our logs folder
 * 
 * @param {String} sourceFolder - the path of the source folder
 * @param {String} destFolder - the path of the destination folder
 * @param {String} fileName - the name of the file
 */
module.exports = (logTitles, fileName) => {
	const date = moment(new Date()).format("YYYY-MM-DD");
	let destFolder = `${config.logsFolderPath}/${date}/`;

	if (!fs.existsSync(destFolder)) {
		fs.mkdirSync(destFolder);
	}
	if(fileName) {
		fs.writeFileSync(`${destFolder}${fileName}`, logTitles.toString(), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log("INFO: the log file has been created");
			}
		});
	} else 
		console.log("INFO: no file created");
};
