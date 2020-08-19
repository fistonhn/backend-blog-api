import express from 'express';
import usersRouter from './src/routes/user.route';
import blogsRouter from './src/routes/blog.route';
import messagesRouter from './src/routes/message.route';
import config from './src/config/configulation';

const app = express();

app.use(express.json());

app.use('/api', usersRouter);

app.use('/api', blogsRouter);

app.use('/api', messagesRouter);


app.use('/', (req, res) => { res.status(400).send({ status: 400, error: 'Incorrect route! try again' }); });

const { port } = config;

const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
