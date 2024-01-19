const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema({
  _id: ObjectId(""),
  property_id: ObjectId(""),
  body: {
    type: String,
    required: [true, "Comment is required."],
    trim: true,
  },

  author: {
    type: ObjectId(""),
    ref: User,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;