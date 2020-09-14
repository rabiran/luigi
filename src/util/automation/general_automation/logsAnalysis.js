const kartoffelObjDiff = require('./kartoffelObjDiff')
const searchInKartoffel = require('../../searchInKartoffel');
const createLogFile = require('../../createLogFile')

module.exports = async (idObj, logTitles, personBeforeKartingRun) =>{
    let tempResArray = [];
    let personAfterKartingRun;
    let personUpdates;
    for (const title of logTitles) {
        switch (title) {
            case 'INF_ADD_PERSON_TO_KARTOFFEL':
                    personAfterKartingRun = await searchInKartoffel(idObj);
                    let addedPersonLogObject = {
                        identifier: idObj,
                        kartoffelPersonId: personAfterKartingRun.data._id
                    }
                    createLogFile(addedPersonLogObject);
                    tempResArray.push(`the person now added to kartoffel`)
                    break;
                case 'INF_ADD_DOMAIN_USER': 
                    tempResArray.push(`a new domain user has now added to the person`)
                    break;
                case 'INF_ADD_HIERARCHY':
                    tempResArray.push(``)
                    break;
                case 'INF_UPDATE_DIRECT_GROUP_TO_PERSON':
                    tempResArray.push(`the person hiererchy updatad`)
                    break;
                case 'INF_UPDATE_PERSON_IN_KARTOFFEL':
                    personAfterKartingRun = await searchInKartoffel(idObj);
                    personUpdates = await kartoffelObjDiff(personBeforeKartingRun, personAfterKartingRun)
                    tempResArray.push(`the person has now udated`)
                    break;
                // case 'ERR_NOT_FOUND_IN_RAW_DATA':
                //     tempResArray.push(`this person does not axist in the given data source`)
                //     break;
                default:
                    break;
            }
        }
        return { tempResArray, personUpdates};
}