const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let SchemaTypes = Schema.Types;

const PostSchema = new Schema(
  {
    text: {
      type: SchemaTypes.String,
      maxLength: 999,
      required: false,
    },
    media: {
      type: [SchemaTypes.String],
      required: false,
    },
    is_deleted: {
      type: SchemaTypes.Boolean,
      default: false,
      required: true,
    },
    is_active: {
      type: SchemaTypes.Boolean,
      default: false,
      required: true,
    },
    comments: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Comments",
      },
    ],
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },

    last_update_from_user: {
      type: SchemaTypes.ObjectId,
    },
  },
  { collection: "Posts", timestamps: true },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
