const jwt = require('jsonwebtoken')
const { User } = require('../models')
const config = require('../config/global.config')

module.exports = async (token) => {
    try {
        if (!token) return null

        const normalizedToken = token.split(' ')[1]

        const decoded = jwt.verify(normalizedToken, config.JWT_KEY)
        const user = await User.findById(decoded._id)

        if (!user) return null

        const { iat, exp, ...userData } = decoded

        return {
            ...userData
        }
    } catch (error) {
        console.error(error)
        return undefined
    }
}
