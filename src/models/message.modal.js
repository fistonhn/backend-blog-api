import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  email: String,
  name: String,
  message: String

});

export default mongoose.model('messages', messageSchema);