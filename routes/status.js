const express = require('express');
const Request = require('../model/Request');

const router = express.Router();

router.get('/:requestId', async (req, res) => {
    const request = await Request.findOne({ requestId: req.params.requestId });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json({ status: request.status, output: request.output || [] });
});

module.exports = router;