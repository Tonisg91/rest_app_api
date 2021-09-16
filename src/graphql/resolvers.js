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
        singleCompany: async (a, { id }, c) => await M.Company.findById(id)
    },
    Mutation: {
        ...mutations.auth,
        ...mutations.company,
        ...mutations.user
    },
    Company: {
        owner: populateInstance('User', 'owner')
    }
}

module.exports = resolvers
