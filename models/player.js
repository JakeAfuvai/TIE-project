const mongoose = require("mongoose")
const Schema = mongoose.Schema

const playerSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true,
        enum: ["Senior", "Junior", "Sophomore", "Freshman"]
    },
    position: Array,
    image: {
        type: String,
        default: ""
    },
    assignedEquipment: {
        helmet: {
            type: String,
            default: "No Helmet Assigned"
        },
        shoulderpads: {
            type: String,
            default: "No Shoulderpads Assigned"
        }
    },
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

module.exports = mongoose.model("Player", playerSchema)