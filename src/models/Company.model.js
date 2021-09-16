const { Schema } = require('mongoose')
const WithAuditModel = require('./WithAudit.model')

module.exports = WithAuditModel('Company', {
    name: String,
    CIF: String,
    logo: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    phoneNumber: String,
    hiredModules: String // SubSchema?
})
