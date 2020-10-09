const mongoose = require('mongoose');
const validator = require('validator');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  avatar: {
    type: Buffer,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
