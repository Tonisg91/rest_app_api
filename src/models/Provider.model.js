const { Schema } = require('mongoose')
const WithAuditModel = require('./WithAudit.model')

module.exports = WithAuditModel('Provider', {
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    phoneNumber: String,
    name: String,
    email: String
})
