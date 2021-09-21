const { Schema } = require('mongoose')
const { PRODUCT_TYPES } = require('../utils/constants')
const WithAuditModel = require('./WithAudit.model')

module.exports = WithAuditModel('Product', {
    name: String,
    price: Number,
    cost: Number,
    category: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider'
    },
    stock: Number,
    warehouseStock: Number,
    image: String,
    productType: {
        type: String,
        enum: PRODUCT_TYPES
    }
})
