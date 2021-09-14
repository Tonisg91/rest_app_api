const mutations = require('./mutations')

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
        ...mutations.auth,
        ...mutations.user
    }
}

module.exports = resolvers
