import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword } from '../helper/hashedPassword';

uuidv4(); 

const users = [];

const signup = (req, res) => {


  const takenEmail = users.find((user) => user.email === req.body.email);
  if (takenEmail) return res.status(409).json({ status: 409, message: 'Email address already taken' });

  const id = uuidv4();
  const role = "guest";

  let { name, email, password } = req.body;

  password = encryptPassword(password);
  const user = new User(id, role, name, email, password);

  const token = generateToken(id, user.email, role);

  users.push(user);


  res.status(201).json({ status: 201, message: 'User created successfull', data: { token } });
};


export { signup, users };