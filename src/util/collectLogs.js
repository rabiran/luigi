const config = require("../config/config");
const fs = require('fs');


module.exports = async identifiersArray => {
    const path = config.logsPath;
    const files = fs.readdirSync(`${path}/`);
    const filesNames = identifiersArray.map(
        obj => 
            files.filter(
                file => file.startsWith(obj.identityCard)
            )
    ).flat();
    const fileTitles = filesNames.map(fileName => {
        if(files.includes(fileName)) {
            const linesArray = fs.readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'}).toString().split("\n");
            linesArray.pop(); // remove last element empty line
            const logsTitles = linesArray.map(line => {
                return JSON.parse(line).title;
            })
            return logsTitles;
        }
        else {
            return [];
        }
    })
}
