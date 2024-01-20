const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema({
  
  body: {
    type: String,
    required: [true, "Comment is required."],
    trim: true,
  },
  property: { type: Schema.Types.ObjectId, ref: "Property" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;