import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';

@route('/')
export class DefaultController {
  @GET()
  public index(req: Request, res: Response): void {
    res.status(200).json({ status: 'Running' });
  }
}
