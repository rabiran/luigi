const kartoffelObjDiff = require('./kartoffelObjDiff')
const searchInKartoffel = require('../../searchInKartoffel');

module.exports = async (idObj, logTitles, personBeforeKartingRun) =>{
    let personAfterKartingRun = await searchInKartoffel(idObj);
    let personUpdates = await kartoffelObjDiff(personBeforeKartingRun, personAfterKartingRun)
    let tempResArray = [];
        for (const title of logTitles) {
            switch (title) {
                case 'INF_ADD_PERSON_TO_KARTOFFEL':
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
                    let personAfterKartingRun = await searchInKartoffel(idObj);
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