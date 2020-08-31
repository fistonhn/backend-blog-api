import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config();

const generateToken = ( email, role) => {
  const token = jwt.sign({ userEmail: email, role: role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });

  return token;
};

export default generateToken;
