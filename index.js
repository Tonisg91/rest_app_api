const app = require('./src/app')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./src/graphql')
// const getUser = require('./src/middlewares/getUser')

const server = new ApolloServer({
    typeDefs,
    resolvers
    // context: ({ req }) => {
    //     // get the user token from the headers
    //     const token = req.headers.authorization
    //     console.log({ authorization: req.headers.authorization, token })

    //     // try to retrieve a user with the token
    //     const user = getUser(token)

    //     // optionally block the user
    //     // we could also check user roles/permissions here
    //     if (!user) throw new AuthenticationError('You must be logged in')

    //     // add the user to the context
    //     return { user }
    // }
})
server.start().then(() => server.applyMiddleware({ app }))
