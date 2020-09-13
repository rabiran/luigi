module.exports = async (kartingObj) => {
    if (kartingObj.records.length > 0) {
        return []
    } else return ` this person does not axist in the given data source`
}