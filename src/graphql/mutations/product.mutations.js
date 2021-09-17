const { ApolloError, AuthenticationError } = require('apollo-server-errors')

const { Product } = require('../../models')
const { USER } = require('../../utils/constants')

const createProduct = async (_, args, context) => {
    if (!context.user) {
        return new AuthenticationError('Por favor, inicia sesión.')
    }

    if (context.user.role === USER) {
        return new AuthenticationError('No autorizado.')
    }

    const { _id, company } = context.user

    const instanceBody = {
        ...args,
        createdBy: _id,
        company
    }

    const product = new Product({ ...instanceBody })

    try {
        await product.save()
    } catch (error) {
        throw new ApolloError(error.message)
    }

    return product
}

module.exports = {
    createProduct
}
