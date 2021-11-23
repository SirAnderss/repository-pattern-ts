import { Request, Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../dtos/movement.dto';
import { BaseController } from '../common/controllers/base.controller';

@route('/movements')
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super();
  }

  @GET()
  public async index(req: Request, res: Response) {
    try {
      res.send(await this.movementService.all());
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const result = await this.movementService.find(id);

      result ? res.send(result) : res.sendStatus(404);
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.movementService.store({
        userId: req.body.userId,
        type: req.body.type,
        amount: req.body.amount
      } as MovementCreateDto);

      res.send();
    } catch (error) {
      this.handleExeption(error, res);
    }
  }
}
