// const jwt = require('jsonwebtoken')
// // const { User } = require('../models')
// const config = require('../config/global.config')

// module.exports = async (token) => {
//     try {
//         if (!token) return null

//         const normalizedToken = token.split(' ')[1]
//         console.log(token)

//         // const decoded = jwt.verify(normalizedToken, config.JWT_KEY)
//         // const user = await User.findById(decoded._id).populate(
//         //     'role',
//         //     'name -_id'
//         // )

//         if (!user) return null

//         // req.user = {
//         //     userId: user._id,
//         //     role: user.role.name,
//         //     companyId: user.company
//         // }
//         return false
//         // return {
//         //     user: user._id,
//         //     role: user.role,
//         //     company: user.company
//         // }
//     } catch (error) {
//         console.error(error)
//         return undefined
//     }
// }
