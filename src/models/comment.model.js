import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  blogId: String,
  name: String,
  comment: String
  
});

export default mongoose.model('comments', commentSchema);