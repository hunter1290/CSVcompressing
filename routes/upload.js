const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const Request = require('../model/Request');
const { requestQueue, processQueue } = require('../services/queue');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.any(), async (req, res) => {
    const requestId = uuidv4();
    const requestData = [];

    fs.createReadStream(req.files[0].path)
        .pipe(csv())
        .on('data', (row) => {
            requestData.push({
                serialNumber: row['S. No.'],
                productName: row['Product Name'],
                inputImages: row['Input Image Urls'].split(',').map(url => url.replace(/\s+/g, '')),
                outputImages: []
            });
        })
        .on('end', async () => {
            await Request.create({ requestId, status: 'pending', data: requestData });
            requestQueue.push(requestId);
            processQueue();
            res.json({ requestId:requestId,status:"pending" });
        });
});

module.exports = router;