const config = require("../config/config");
const fs = require('fs');

/**
 * 
 * @param {Object} idObj - an object of { identityCard, personalNumber, domainUser } 
 * @param {String} runUID - the unique id of the run that we have activated in karting
 * @param {Date} date - the date of the run
 * @returns - array of the titels of the logs and the name of the logs file 
 */
module.exports = async (idObj, runUID, date) => {
	const path = `${config.logsPath}/${date}`;
	const files = fs.readdirSync(`${path}/`);
	const fileName = files.filter(
				file => file.startsWith(`${runUID}-${idObj.identityCard}`)
			);

	let logTitles = [];
	if (fileName.length == 1) {
		const linesArray = fs.readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'}).toString().split("\n");
		linesArray.pop(); // remove last element empty line
		logTitles = linesArray.map(line => {
			return JSON.parse(line).title;
		})

	}else if(fileName.length > 1){
		console.log('we have more then one file with this id')
		return {}
	} else{
		console.log('we have no file with this id')
		return {}
	}

	return {logTitles, fileName};

}
