const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/base.router');
const { initializeDb } = require('./utils/InitializeDb');
const path = require('path');
app.use(cors());
app.use(express.json());



app.use('/api', router);


app.use('/', express.static('public'));

initializeDb();


app.use((error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});