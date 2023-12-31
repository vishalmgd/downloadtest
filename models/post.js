const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        // unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    // image: {
    //     type: String,
    //     required: false,
    // },

    createdAt: {
        type: Date,
        default: new Date(),
    }
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;