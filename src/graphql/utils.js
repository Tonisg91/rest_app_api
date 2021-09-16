const M = require('../models')

exports.populateInstance = (modelName, fieldName) => async (args) =>
    await M[modelName].findById(args[fieldName])

exports.populateFromArray = (modelName, fieldName) => async (args) => {
    if (!args[fieldName] || !args[fieldName].length) return []

    return await M[modelName].find({ _id: { $in: args[fieldName] } })
}

exports.getCompany = this.populateInstance('Company', 'company')
