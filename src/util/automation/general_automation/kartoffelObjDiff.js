const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff");

module.exports = async (personBeforeKartingRun, personAfterKartingRun) => {
    let diff = detailedDiff(personBeforeKartingRun, personAfterKartingRun);
    return diff.updated
    //needs to be checked inside if it is diff.updated or diff.added
}