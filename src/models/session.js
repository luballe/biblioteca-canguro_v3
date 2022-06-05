const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const SessionSchema = new mongoose.Schema(
  {
    user_id: String,
    token: String,
    valid_from: Number,
    valid_until: Number,
  },
  { timestamps: true }
);

SessionSchema.plugin(mongooseDelete, { deletedAt: true });

const Session = mongoose.model('Session', UserSession);
module.exports = Session;
