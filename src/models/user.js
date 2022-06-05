const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    hash: String,

  },
  { timestamps: true }
);

UserSchema.plugin(mongooseDelete, { deletedAt: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
