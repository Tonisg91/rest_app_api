const { gql } = require('apollo-server-core')

const typeDefs = gql`
    type Query {
        ping: String
        hello: String
    }
`

module.exports = typeDefs
