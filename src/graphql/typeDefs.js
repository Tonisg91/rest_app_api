const { gql } = require('apollo-server-core')

const typeDefs = gql`
    scalar Date

    type Query {
        ping: String
        company: [Company]
        singleCompany(id: ID): Company
    }
    type Mutation {
        createUser(dni: String!, name: String!, lastname: String): User

        login(dni: String!, password: String!): AuthPayload

        createCompany(CIF: String!, name: String!, owner: String!): Company
        createProduct(
            name: String!
            price: Float
            cost: Float
            productType: String!
            image: String
            provider: ID
        ): Product
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Product {
        _id: ID!
        company: Company!
        name: String
        price: Float
        cost: Float
        provider: Provider
        stock: Float
        warehouseStock: Float
        image: String
        productType: String
        createdBy: User
        updatedBy: User
        createdAt: Date
        updatedAt: String
    }

    type Provider {
        _id: ID!
        company: Company!
        phoneNumber: String
        name: String
        email: String
        createdBy: User
        updatedBy: User
        createdAt: String
        updatedAt: String
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
        createdBy: User
        updatedBy: User
        createdAt: String
        updatedAt: String
    }

    type Company {
        _id: ID!
        CIF: String!
        hiredModules: String
        logo: String
        name: String!
        owner: User!
        phoneNumber: String
        createdBy: User
        updatedBy: User
        createdAt: String
        updatedAt: String
    }
`

module.exports = typeDefs
