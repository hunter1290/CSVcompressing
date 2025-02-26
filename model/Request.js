const mongoose = require('mongoose');
const RequestSchema = new mongoose.Schema({
    requestId: String,
    status: { type: String, default: 'pending' },
    data: Array,
    output: Array
});

module.exports = mongoose.model('Request', RequestSchema);