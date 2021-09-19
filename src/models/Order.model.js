const { Schema } = require('mongoose')
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
    productList: [productListSubSchema]
})
