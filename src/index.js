require('dotenv').config()
require('./config/db.config')

const { ApolloServer } = require('apollo-server')

const { typeDefs, resolvers } = require('./graphql')
const getUser = require('./middlewares/getUser')

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

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
