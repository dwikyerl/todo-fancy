const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: [true, 'Username has been taken'],
    required: 'Username is required',
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email has been taken'],
    required: 'Email is required',
  },
  password: {
    type: String,
    trim: true,
  },
}, { timestamps: false });

userSchema.methods.matchPassword = async function(passwordString) {
  const match = await bcrypt.compare(passwordString, this.password);
  return match;
};

userSchema.statics.isValidUser = function(username) {
  const criteria = (!username.includes('@')) ? { username: username } : { email: username };
  console.log(criteria);
  return this.findOne(criteria);
}

userSchema.pre('save', async function(next) {
  if (this.password) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
