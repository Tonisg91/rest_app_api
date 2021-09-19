const { Product } = require('../../models')

const DBService = require('../../services/DBService')

const ProductService = new DBService(Product)

const createProduct = async (_, args, context) =>
    await ProductService.createInstance(args, context)

const updateProduct = async (_, args, context) =>
    await ProductService.updateInstance(args, context)

const deactivateProduct = async (_, args, context) =>
    await ProductService.deactivateInstance(args, context)

module.exports = {
    createProduct,
    updateProduct,
    deactivateProduct
}
