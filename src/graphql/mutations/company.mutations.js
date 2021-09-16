const { Company } = require('../../models')
const {
    ApolloError,
    UserInputError,
    AuthenticationError
} = require('apollo-server-errors')
const { ADMIN } = require('../../utils/constants')

const createCompany = async (_, args, context) => {
    if (!context.user) {
        return new AuthenticationError('Por favor, inicia sesión.')
    }

    if (context.user.role !== ADMIN) {
        return new AuthenticationError('No autorizado.')
    }

    try {
        const hasCompany = await Company.findOne({ CIF: args.CIF })

        if (hasCompany)
            return new UserInputError('La empresa ya existe', {
                argumentName: 'CIF'
            })
    } catch (error) {
        return new ApolloError(error.message)
    }

    const instanceBody = {
        ...args,
        createdBy: context.user._id
    }

    const company = new Company({ ...instanceBody })

    try {
        await company.save()
    } catch (error) {
        throw new ApolloError(error.message)
    }

    return company
}

module.exports = {
    createCompany
}
