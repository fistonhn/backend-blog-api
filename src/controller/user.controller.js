import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';

uuidv4(); 

const users = [];

const signup = (req, res) => {


  const takenEmail = users.find((user) => user.email === req.body.email);
  if (takenEmail) return res.status(409).json({ status: 409, message: 'Email address already taken' });

  const id = uuidv4();
  const role = "admin";

  let { name, email, password } = req.body;

  password = encryptPassword(password);
  const user = new User(id, role, name, email, password);

  const token = generateToken(id, user.email, role);

  users.push(user);


  res.status(201).json({ status: 201, message: 'User created successfull', data: { token } });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const usersFound = users.find(((userInfo) => userInfo.email === email));
  if (!usersFound) return res.status(404).send({ status: 404, message: 'No associated account with this email. 😩' });

  const isPasswordValid = decryptPassword(password, usersFound.password);
  if (!isPasswordValid) return res.status(401).json({ status: 401, error: 'Incorrect password!' });

  const token = generateToken(usersFound.id, usersFound.email);

  res.status(200).json({ status: 200, message: 'loggin successfull', data: { token } });
};

export { signup, login, users };