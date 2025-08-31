const nodemailer = require('nodemailer')
require('dotenv').config()

// console.log(process.env.APP_PASS)

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    // host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS
        // user: 'melyna.wiza@ethereal.email',
        // pass: 'QzSttQzH4zkwbYTMkf'
    },
    // logger: true,
    // debug: true
})

module.exports = {
    transporter
}