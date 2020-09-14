const fs = require("fs");

/**
 * the function create the folders on the path if they dosn't exist
 * @param {string} path - string of the path 
 */
module.exports = async (path) => {
    let foldersArray = path.split('/');
    foldersArray.pop();//the last one is empty
    let relativePath = "";
    for (const folderName of foldersArray) {
        relativePath += `${folderName}/`;
        if (!fs.existsSync(relativePath)) {
			fs.mkdirSync(relativePath);
        }
    }
}