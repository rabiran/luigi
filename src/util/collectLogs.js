const config = require("../config/config");
const fs = require('fs');


module.exports = async idObj => {
    const path = config.logsPath;
    const files = fs.readdirSync(`${path}/`);
    const fileName = files.filter(
                file => file.startsWith(idObj.identityCard)
            ).flat();

    let fileTitles = [];
    if (files.includes(fileName)) {
        const linesArray = fs.readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'}).toString().split("\n");
        linesArray.pop(); // remove last element empty line
        fileTitles = linesArray.map(line => {
            return JSON.parse(line).title;
        })

    }

    return fileTitles;

}
