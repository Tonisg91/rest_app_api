require('dotenv').config()

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: Number(process.env.PORT) || 5000,
    JWT_KEY: process.env.JWT_KEY,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
    // CLOUDINARY: {
    //     cloud_name: process.env.CLOUDINARY_NAME,
    //     api_key: process.env.CLOUDINARY_KEY,
    //     api_secret: process.env.CLOUDINARY_SECRET
    // },
    // NODEMAILER_ENV: {
    //     host: process.env.NODEMAILER_HOST || 'CE2020022200001.dnssw.net',
    //     port: process.env.NODEMAILER_PORT || 465,
    //     user: process.env.NODEMAILER_USER || 'hola@byfi.com',
    //     pass: process.env.NODEMAILER_PASS || '2V5(dDO5('
    // }
}
