module.exports = async (personId, recordsArray) => {
    if(recordsArray){
        if(recordsArray.length > 1)  console.log(`the records array is not accurate`)
        else if(recordsArray.length == 0) console.log(`there is no record with this id - ${personId} in the records array`)
        else if(recordsArray && !recordsArray[0].userPrincipalName) return `the record does'nt have user principal name, please go to 'צוות מחשוב'`;
        return [];
    } else {
        console.log(`there is a problom with the records array`)
    }
}