const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String,
    enum: ['customer', 'admin'], // Define possible roles
    default: 'customer'
  }
});
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
module.exports = mongoose.model('User', UserSchema);