const mongoose = require("mongoose")
const Schema = mongoose.Schema

const helmetSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    helmetNumber: {
        type: String,
        required: true,
        unique: true
    },
    assigned: {
        type: Boolean,
        default: false
    },
    assignedTo: String,
    showModal: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Helmet", helmetSchema)