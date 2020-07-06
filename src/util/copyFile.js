const fs = require('fs');

module.exports = (sourceFolder, destFolder) =>{
    fs.copyFile(sourceFolder, destFolder, err => {
        if (err) {
          console.error(err);
        } else {
          console.log("INFO: the folder has been moved");
        }
      });
}