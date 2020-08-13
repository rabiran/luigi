module.exports = async (logTitles) =>{
    let resArray = [];
        for (const title of logTitles) {
            switch (title) {
                case 'INF_ADD_PERSON_TO_KARTOFFEL':
                    resArray.push(`the person now added to kartoffel`)
                    break;
                case 'INF_ADD_DOMAIN_USER':
                    resArray.push(`a new domain user has now added to the person`)
                    break;
                case 'INF_ADD_HIERARCHY':
                    resArray.push(``)
                    break;
                case 'INF_UPDATE_DIRECT_GROUP_TO_PERSON':
                    resArray.push(`the person hiererchy updatad`)
                    break;
                case 'INF_UPDATE_PERSON_IN_KARTOFFEL':
                    resArray.push(`the person has now udated`)
                    break;
                case 'ERR_NOT_FOUND_IN_RAW_DATA':
                    resArray.push(`this person does not axist in the given data source`)
                    break;
                default:
                    break;
            }
        }
        return resArray;
}