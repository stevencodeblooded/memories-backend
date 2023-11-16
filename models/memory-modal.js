const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memorySchema = new Schema({
    creator: { type: String, required: true },
    img: { type: String, required: true},
    tags: { type: String, required: true}, 
    title: { type: String, required: true}, 
    description: { type: String, required: true}, 
    likes: { type: String },
    timeline: { type: String },
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('Memory', memorySchema)