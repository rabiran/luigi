const config = require("../config/config");
const fs = require('fs');


module.exports = async (idObj, runUID) => {
    const path = config.logsPath;
    const files = fs.readdirSync(`${path}/`);
    const fileName = files.filter(
                file => file.startsWith(`${runUID}-${idObj.identityCard}`) 
            ).flat();

    let fileTitles = [];
    if (fileName.length >0) {
        const linesArray = fs.readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'}).toString().split("\n");
        linesArray.pop(); // remove last element empty line
        fileTitles = linesArray.map(line => {
            return JSON.parse(line).title;
        })

    }

    return fileTitles;

}
