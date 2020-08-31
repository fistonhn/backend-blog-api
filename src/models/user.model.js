import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  role: String,
  name: String,
  email: String,
  password: String
  
});

  export default mongoose.model('users', userSchema);
  