const upload = require('../config/multer.config');
const router = require('express').Router();

router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        console.log("res", req.body)
        if (!req.file) {
            throw new Error('Please upload a file')
        }
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: req.file,
            filePath: req.file.path.replace('public', ''),
        })
    } catch (error) {
        next(error)
    }
});

module.exports = router;