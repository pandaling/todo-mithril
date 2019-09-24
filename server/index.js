import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import database from './database';
import endpoints from './endpoints';

const { NODE_ENV = 'development' } = process.env;

const app = express();
app.use(helmet());
app.use(cors());

// get information from html forms
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

let publicDir = path.join(__dirname, '..', 'dist');
app.use(express.static(path.join(publicDir, 'src'), { index: false }));

let db = new database();
db.init();
endpoints(app);


app.use('/', (req, res, next) => {
  res.sendFile(path.join(publicDir, 'src', 'index.html'));
});

app.use((err, req, res, next) => {
  if (NODE_ENV === 'development')
    res.status(500).json({ status: false, stack: err.stack });
  else
    res.status(500).json({ status: false, message: 'something went wrong' });
});

module.exports = app;
