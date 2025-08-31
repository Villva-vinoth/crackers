const router = require('express').Router();

const { sendMail, contactMail } = require('../controller/mail.controller');

router.post('/send', sendMail);
router.post('/contact', contactMail);

module.exports = router;