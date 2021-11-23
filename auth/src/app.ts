process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, `../config/${process.env.APP_ENV}.env`),
});

import express from 'express';
import { loadControllers } from 'awilix-express';
import cors from 'cors';
import morgan from 'morgan';
import loadContainer from './container';

export const app: express.Application = express();

app.set('port', process.env.PORT || 8001);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Container
loadContainer(app);

// Controllers
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));
