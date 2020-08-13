const fs = require("fs");

/**
 * copy the file of the logs from karting to our logs fol
 * 
 * @param {String} sourceFolder - the path of the source folder
 * @param {String} destFolder - the path of the destination folder
 * @param {String} fileName - the name of the file
 */
module.exports = (sourceFolder, destFolder, fileName) => {
	if (!fs.existsSync(destFolder)) {
		fs.mkdirSync(destFolder);
	}
	if(fileName) {
		fs.copyFile(sourceFolder, `${destFolder}${fileName}`, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log("INFO: the folder has been moved");
			}
		});
	} else 
		console.log("INFO: no folder has been moved");
};
