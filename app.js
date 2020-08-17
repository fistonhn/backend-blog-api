import express from 'express';
import usersRouter from './routes/user.route';
import blogsRouter from './routes/blog.route';
import config from './config/configulation';

const app = express();

app.use(express.json());

app.use('/api', usersRouter);

app.use('/api', blogsRouter);

app.use('/', (req, res) => { res.status(400).send({ status: 400, error: 'Incorrect route! try again' }); });

const { port } = config;

const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
