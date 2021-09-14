const app = require('./src/app')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./src/graphql')
const getUser = require('./src/middlewares/getUser')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization

        // try to retrieve a user with the token
        const user = await getUser(token)

        // optionally block the user
        // we could also check user roles/permissions here
        // if (!user) throw new AuthenticationError('Debes iniciar sesión')

        // add the user to the context
        return { user }
    }
})

server.start().then(() => server.applyMiddleware({ app }))
