const mongoose = require('mongoose');
const workflowSchema = new mongoose.Schema({
    workflowId: {
        type: Number,
        required: true
    },
    workflowName: {
        type: String,
        required: true
    },
    workflowName: {
        type: String
    },
    workflowPath: {
        type: String
    },
    workflowRunId: {
        type: Number
    },
    status: {
        type: String
    },
    conclusion: {
        type: String
    },
    runAt: {
        type: Number
    },
    repoId: {
        type: Number
    },
    repoName: {
        type: String
    },
    ownerId: {
        type: Number
    },
    ownerName: {
        type: String
    },
    branch: {
        type: String
    },
    commitSHA: {
        type: String
    }
})
module.exports = mongoose.model('Workflow', workflowSchema);