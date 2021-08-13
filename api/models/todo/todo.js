const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading: { type: String, required: true },
    content: { type: String, required: true },
    datetime: { type: String, required: false },
    userid: { type: String, required: true }
});

module.exports = mongoose.model('Todo', todoSchema);