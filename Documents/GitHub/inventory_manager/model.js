const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    assestTag: String,
    serialNumber: String,
    deviceType: String,
    assignedTo: String,
    organization: String,
})

module.exports = mongoose.model('Doc', documentSchema);