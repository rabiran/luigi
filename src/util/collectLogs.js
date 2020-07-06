const config = require("../config/config");
const fs = require('fs');


module.exports = async (idObj, runUID) => {
    const path = config.logsPath;
    const files = fs.readdirSync(`${path}/`);
    const fileName = files.filter(
                file => file.startsWith(`${runUID}-${idObj.identityCard}`) 
            ).flat();

    let logTitles = [];
    if (fileName.length == 1) {
        const linesArray = fs.readFileSync(`${path}/${fileName}`, {encoding: 'utf-8'}).toString().split("\n");
        linesArray.pop(); // remove last element empty line
        logTitles = linesArray.map(line => {
            return JSON.parse(line).title;
        })

    }else if(fileName.length > 1){
        console.log('we have more then one file with thus id')
    }

    return {logTitles, fileName};

}
