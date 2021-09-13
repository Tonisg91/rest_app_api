const { gql } = require('apollo-server-core')

const typeDefs = gql`
    type Query {
        ping: String
        hello: String
    }
    type Mutation {
        signup(
            dni: String!
            password: String!
            name: String!
            lastname: String
        ): User
        login(dni: String!, password: String!): AuthPayload
    }

    type AuthPayload {
        token: String
        user: User
    }

    type User {
        _id: ID!
        avatar: String
        active: Boolean
        company: Company!
        dni: String!
        lastname: String
        name: String!
        phoneNumber: String
        passwordHash: String
        role: String!
        createdAt: String
        updatedAt: String
    }

    type Company {
        _id: ID!
        CIF: String!
        createdAt: String
        hiredModules: String
        logo: String
        name: String!
        owner: User!
        phoneNumber: String
        updatedAt: String
    }
`

module.exports = typeDefs
