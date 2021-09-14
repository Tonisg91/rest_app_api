const { User } = require('../../models')
const {
    ApolloError,
    UserInputError,
    AuthenticationError
} = require('apollo-server-errors')

const createUser = async (_, args, context) => {
    if (!context.user) {
        return new AuthenticationError('No autorizado')
    }

    const { dni, name, lastname } = args

    try {
        const hasUser = await User.findOne({ dni })

        if (hasUser) throw new Error('El usuario ya existe')
    } catch (error) {
        return new UserInputError(error.message, {
            argumentName: 'dni'
        })
    }

    const instanceBody = {
        dni,
        lastname,
        name,
        passwordHash: await User.encryptPassword(dni)
    }

    const user = new User({ ...instanceBody })

    try {
        await user.save()
    } catch (error) {
        throw new ApolloError(error.message)
    }
    return user
}

module.exports = {
    createUser
}
