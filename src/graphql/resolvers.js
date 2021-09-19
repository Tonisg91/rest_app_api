const M = require('../models')
const mutations = require('./mutations')
const { populateInstance } = require('./utils')

const resolvers = {
    Query: {
        // (?, variables, context)
        ping: (a, b, c) => {
            console.log(a, b, c)
            return 'Pong madafaka'
        },
        company: async () => await M.Company.find(),
        singleCompany: async (_, { id }) => await M.Company.findById(id),
        singleProduct: async (_, { id }) => await M.Product.findById(id)
    },
    Mutation: {
        ...mutations.auth,
        ...mutations.company,
        ...mutations.order,
        ...mutations.user,
        ...mutations.product
    },
    Company: {
        owner: populateInstance('User', 'owner')
    },
    Product: {
        createdBy: populateInstance('User', 'createdBy'),
        provider: populateInstance('Provider', 'provider')
    }
}

module.exports = resolvers
