import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(401).json({ error: 'Unauthorised - Header Not Set' });
    return;
  }
  const token = authHeader;


    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {

    if (err) return res.status(401).json({ error: 'Unauthorised or Invalid Token', err });

    req.authUser = decodedToken;

    next();
  });
};


const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(401).json({ err: 'Unauthorised - Header Not Set' });
    return;
  }
  const token = authHeader;


    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {

    if (err) return res.status(401).json({ error: 'Unauthorised or Invalid Token', err });

    req.authUser = decodedToken;

    const role = req.authUser.role

    if (role != "admin") return res.status(401).send({ status: 401, message: 'Access denied! you are not an admin' });

    next();
  });
};

export { verifyAuthToken, verifyAdminToken };
