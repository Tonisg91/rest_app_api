const { Schema } = require('mongoose')
const { OPEN, ORDER_STATUS } = require('../utils/constants')
const WithAuditModel = require('./WithAudit.model')

const productListSubSchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number,
        comments: String
    },
    {
        _id: false,
        versionKey: false
    }
)

module.exports = WithAuditModel('Order', {
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    tableNumber: String,
    productList: [productListSubSchema],
    status: {
        type: String,
        default: OPEN,
        enum: ORDER_STATUS
    }
})
