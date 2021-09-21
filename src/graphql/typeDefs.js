const { gql } = require('apollo-server-core')

const typeDefs = gql`
    scalar Date
    scalar Void

    # QUERIES
    type Query {
        ping: String
        company: [Company]
        companyUsers: [User]
        companyProducts: [Product]
        singleCompany(id: ID!): Company
        singleProduct(id: ID!): Product
        singleOrder(id: ID!): Order
        ordersOfCompany: [Order]
    }
    # QUERIES END

    # MUTATIONS
    type Mutation {
        createUser(dni: String!, name: String!, lastname: String): User

        login(dni: String!, password: String!): AuthPayload

        createCompany(CIF: String!, name: String!, owner: String!): Company

        # PRODUCT MUTATION

        createProduct(
            name: String!
            price: Float
            category: String
            cost: Float
            productType: String!
            image: String
            stock: Int
            warehouseStock: Int
            provider: ID
        ): Product
        updateProduct(
            id: ID!
            name: String
            price: Float
            cost: Float
            productType: String
            stock: Int
            warehouseStock: Int
            image: String
            provider: ID
        ): Product

        deactivateProduct(id: ID!): Void

        # ORDER MUTATIONS

        createOrder(
            tableNumber: String!
            productList: [productListInput]!
        ): Order

        updateOrder(
            id: ID!
            tableNumber: String
            productList: [productListInput]
            status: OrderStatus
        ): Order

        deactivateOrder(id: ID!): Void
    }
    # MUTATIONS END

    # INPUTS
    input productListInput {
        item: ID!
        qty: Int!
        comments: String
    }

    # INPUTS END

    # TYPES

    type AuthPayload {
        token: String
        user: User
    }

    type Product {
        _id: ID!
        category: String
        company: Company!
        name: String
        price: Float
        cost: Float
        provider: Provider
        stock: Int
        warehouseStock: Int
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

    type Order {
        _id: ID!
        tableNumber: String
        productList: [productList]
        status: OrderStatus
        createdBy: User
        updatedBy: User
        createdAt: String
        updatedAt: String
    }

    enum OrderStatus {
        OPEN
        CLOSED
    }

    type productList {
        item: Product!
        qty: Int!
        comments: String
    }
`

module.exports = typeDefs
