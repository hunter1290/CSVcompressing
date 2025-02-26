const Request = require('../model/Request');
const { compressImage } = require('./imageProcessor');

const requestQueue = [];
let isProcessing = false;

async function processQueue() {
    if (isProcessing || requestQueue.length === 0) return;

    isProcessing = true;
    const requestId = requestQueue.shift();
    const request = await Request.findOne({ requestId });
    if (!request) return;

    request.status = 'processing';
    await request.save();

    try {
        for (let item of request.data) {
            const outputUrls = await Promise.all(item.inputImages.map(compressImage));
            item.outputImages = outputUrls;
        }
        request.status = 'completed';
        request.output = request.data;
    } catch (error) {
        request.status = 'failed';
        console.error('Processing error:', error);
    }

    await request.save();
    isProcessing = false;
    setImmediate(processQueue);
}

module.exports = { requestQueue, processQueue };