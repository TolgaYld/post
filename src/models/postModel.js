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
    last_update_from_user_id: {
      type: SchemaTypes.UUID,
    },
  },
  { collection: "Posts", timestamps: true },
);

PostSchema.pre("deleteMany", function (next) {
  let post = this;
  post.model("Assignment").deleteOne({ post: post._id }, next);
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
