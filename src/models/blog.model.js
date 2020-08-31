import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  email: String,
  title: String,
  content: String,
  author: String
  
});

export default mongoose.model('blogs', blogSchema);