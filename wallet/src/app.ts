process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, `../config/${process.env.APP_ENV}.env`)
});

import express from 'express';
import { loadControllers } from 'awilix-express';
import cors from 'cors';
import jwt from 'express-jwt';
import morgan from 'morgan';
import loadContainer from './container';

const app: express.Application = express();

app.set('port', process.env.PORT || 8002);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Container
loadContainer(app);

// JwT
if (process.env.JWT_SECRET_KEY) {
  app.use(
    jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256']
    }).unless({ path: ['/'] })
  );
}

// Controllers
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export default app;
