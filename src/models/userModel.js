const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let SchemaTypes = Schema.Types;

const UserSchema = new Schema(
  {
    user_id: {
      type: SchemaTypes.UUID,
      required: true,
    },
  },
  { collection: "Users", timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
