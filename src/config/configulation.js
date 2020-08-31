import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect('mongodb+srv://fistonhn:habimana@cluster0.dazrr.mongodb.net/fistonBlog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const config = {
  port: process.env.PORT || 6000

};

export default config;
