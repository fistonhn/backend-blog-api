import User from '../models/user.model';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';


const users = [];

const signup = (req, res) => {


  const takenEmail = users.find((user) => user.email === req.body.email);
  if (takenEmail) return res.status(409).json({ status: 409, message: 'Email address already taken' });

  const id = users.length + 1;
  const role = req.body.role  ||  "guest";

  let { name, email, password } = req.body;

  password = encryptPassword(password);
  const user = new User(id, role, name, email, password);

  const token = generateToken(id, user.email, role);

  users.push(user);


  res.status(201).json({ status: 201, message: 'User created successfully', data: { token } });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const usersFound = users.find(((userInfo) => userInfo.email === email));
  if (!usersFound) return res.status(404).send({ status: 404, message: 'No associated account with this email' });

  const isPasswordValid = decryptPassword(password, usersFound.password);
  if (!isPasswordValid) return res.status(401).json({ status: 401, message: 'Incorrect password!' });

  const token = generateToken(usersFound.id, usersFound.email);

  res.status(200).json({ status: 200, message: 'loggin successfull', data: { token } });
};


const getAllUsers = (req, res) => {

  const usersFound = users.find((user) => user );

  if (!usersFound) return res.status(404).json({ status: 404, message: 'There are no available users' });

  const allusers = users.sort((a, b) => (new Date(b.createdOn)).getTime()
  - (new Date(a.createdOn).getTime()));

  res.status(200).json({ status: 200, data: allusers });
};

const getSpecificUser = (req, res) => {
  const user = users.find((user) => user.id == req.params.id );

  if (!user) return res.status(404).json({ status: 404, message: 'No user found' });

  return res.status(200).json({ status: 200, data: user });
};


export { signup, login, getAllUsers, getSpecificUser, users };