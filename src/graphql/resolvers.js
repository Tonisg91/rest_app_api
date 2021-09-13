const jwt = require('jsonwebtoken')
const { ApolloError, UserInputError } = require('apollo-server-express')

const config = require('../config/global.config')
const M = require('../models')

const signToken = (_id, role) => {
    const token = jwt.sign(
        { _id, role }, // userId
        String(config.JWT_KEY), // Secret JWT key
        { expiresIn: 60 * 60 * 24 * 365 } // Expires in one year
    )
    return `Bearer ${token}`
}

const resolvers = {
    Query: {
        // (?, variables, context)
        ping: (a, b, c) => {
            console.log(a, b, c)
            return 'Pong madafaka'
        },
        hello: () => 'World'
    },
    Mutation: {
        signup: async (_, args) => {
            const { dni, name, lastname } = args

            try {
                const hasUser = await M.User.findOne({ dni })

                if (hasUser) throw new Error('El usuario ya existe')
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: dni
                })
            }

            const instanceBody = {
                dni,
                lastname,
                name,
                passwordHash: await M.User.encryptPassword(dni)
            }

            const user = new M.User({ ...instanceBody })

            try {
                await user.save()
            } catch (error) {
                throw new ApolloError(error.message)
            }
            return user
        },
        login: async (_, args) => {
            const { dni, password } = args

            try {
                const userFound = await M.User.findOne({ dni })

                if (!userFound) throw new Error('Usuario no encontrado')

                const passwordMatch = await M.User.comparePassword(
                    password,
                    userFound.passwordHash
                )

                if (!passwordMatch) throw new Error('La contraseña no coincide')

                const token = signToken(userFound._id, userFound.role)

                return { token, user: userFound }
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    }
}

module.exports = resolvers
