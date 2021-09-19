const { ApolloError, AuthenticationError } = require('apollo-server-errors')

const { USER } = require('../utils/constants')

class DBService {
    constructor(model) {
        this.model = model
    }

    async createInstance(args, context) {
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

        try {
            const instance = await this.model.create({ ...instanceBody })
            return instance
        } catch (error) {
            throw new ApolloError(error.message)
        }
    }

    async updateInstance(args, context) {
        if (!context.user) {
            return new AuthenticationError('Por favor, inicia sesión.')
        }

        if (context.user.role === USER) {
            return new AuthenticationError('No autorizado.')
        }

        const { _id, company } = context.user

        const query = { _id: args.id, company }

        try {
            const product = await this.model.findOne(query)
            if (!product) return new ApolloError('Not found.')

            const instanceBody = {
                ...args,
                updatedBy: _id
            }

            const updatedProduct = await this.model.findOneAndUpdate(
                query,
                {
                    ...instanceBody
                },
                { new: true }
            )

            return updatedProduct
        } catch (error) {
            return new ApolloError(error.message)
        }
    }

    async deactivateInstance(args, context) {
        if (!context.user) {
            return new AuthenticationError('Por favor, inicia sesión.')
        }

        if (context.user.role === USER) {
            return new AuthenticationError('No autorizado.')
        }

        const { _id, company } = context.user

        const query = { _id: args.id, company }

        try {
            const product = await this.model.findOne(query)
            if (!product) return new ApolloError('Not found.')

            await this.model.toggleState(args.id, _id)

            return
        } catch (error) {
            return new ApolloError(error.message)
        }
    }
}

module.exports = DBService
