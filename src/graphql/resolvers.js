const M = require('../models')
const mutations = require('./mutations')
const { populateInstance, populateProductList } = require('./utils')

const resolvers = {
    Query: {
        ping: (a, b, c) => {
            // (?, variables, context)
            console.log(a, b, c)
            return 'Pong madafaka'
        },
        company: async () => await M.Company.find(),
        companyUsers: async (_, _vars, context) =>
            await M.User.find({ company: context.user.company }),
        ordersOfCompany: async (_, _vars, context) =>
            await M.Order.find({ company: context.user.company }),
        singleOrder: async (_, { id }) => await M.Order.findById(id),
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
    },
    Order: {
        createdBy: populateInstance('User', 'createdBy'),
        updatedBy: populateInstance('User', 'createdBy'),
        productList: populateProductList
    }
}

module.exports = resolvers
