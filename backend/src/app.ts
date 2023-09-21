import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import api from './api';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());


app.get<{}, { msg: string }>('/', (req, res) => {
    return res.json({ msg: 'Hello World!' });
    });

app.use('/api/', api)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});