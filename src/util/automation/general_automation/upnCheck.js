module.exports = async (personId, recordsArray) => {
    let recordObj  = recordsArray.find(recordObj => recordObj.id == personId)
    if(recordObj){

        if(recordObj.record.length > 1)  console.log(`the records array is not accurate`)
        else if(recordObj.record.length == 0) console.log(`there is no record with this id - ${personId} in the records array`)
        else if(recordObj && !recordObj.record[0].userPrincipalName) return `the record does'nt have user principal name, please go to 'צוות מחשוב'`;
        return [];
    }
}