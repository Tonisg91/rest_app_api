const M = require('../models')

exports.populateInstance = (modelName, fieldName) => async (args) =>
    await M[modelName].findById(args[fieldName])

exports.populateFromArray = (modelName, fieldName) => async (args) => {
    if (!args[fieldName] || !args[fieldName].length) return []

    return await M[modelName].find({ _id: { $in: args[fieldName] } })
}

exports.populateProductList = async ({ productList }) => {
    const productIds = [...new Set(productList.map((e) => e.item))]

    const foundProducts = await M.Product.find({
        _id: { $in: productIds }
    })

    return productList.map((e) => ({
        ...e._doc,
        item: foundProducts.find((elem) => String(elem._id) === String(e.item))
    }))
}

exports.getCompany = this.populateInstance('Company', 'company')
