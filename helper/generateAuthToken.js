import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config();

const generateToken = (id, email) => {
  const token = jwt.sign({ Id: id, userEmail: email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });

  return token;
};

export default generateToken;
