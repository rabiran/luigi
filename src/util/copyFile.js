const fs = require("fs");

module.exports = (sourceFolder, destFolder, fileName) => {
	if (!fs.existsSync(destFolder)) {
		fs.mkdirSync(destFolder);
	}
	fs.copyFile(sourceFolder, `${destFolder}${fileName}`, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("INFO: the folder has been moved");
		}
	});
};
