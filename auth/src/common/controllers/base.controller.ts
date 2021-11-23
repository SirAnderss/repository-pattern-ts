import { Response } from 'express';
import { ApplicationException } from '../exceptions/application.exeption';

export abstract class BaseController {
  handleExeption(error: any, res: Response): void {
    if (error instanceof ApplicationException) {
      res.status(400).send(error.message);
    } else {
      throw new Error(error);
    }
  }
}
