const jwt = require('jsonwebtoken')
const { ApolloError, UserInputError } = require('apollo-server-errors')

const { User } = require('../../models')
const config = require('../../config/global.config')

const signToken = (user) => {
    const { company, _id, role } = user
    const token = jwt.sign(
        { _id, role, company },
        String(config.JWT_KEY),
        { expiresIn: 60 * 60 * 24 * 7 } // Expires in one week
    )
    return `Bearer ${token}`
}

const login = async (_, args) => {
    const { dni, password } = args

    try {
        const userFound = await User.findOne({ dni })

        if (!userFound)
            return new UserInputError('Usuario no encontrado', {
                argumentName: 'dni'
            })

        const passwordMatch = await User.comparePassword(
            password,
            userFound.passwordHash
        )

        if (!passwordMatch)
            return new UserInputError('La contraseña no coincide', {
                argumentName: 'password'
            })

        const token = signToken(userFound)

        return { token, user: userFound }
    } catch (error) {
        throw new ApolloError(error.message)
    }
}

module.exports = {
    login
}
