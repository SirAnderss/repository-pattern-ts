import { Request, Response } from 'express';
import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto
} from '../dtos/subscription.dto';
import { BaseController } from '../common/controllers/base.controller';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async index(req: Request, res: Response) {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const result = await this.subscriptionService.find(id);

      result ? res.send(result) : res.sendStatus(404);
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.subscriptionService.store({
        userId: req.body.userId,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as SubscriptionCreateDto);

      res.send();
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as SubscriptionUpdateDto);

      res.send();
    } catch (error) {
      this.handleExeption(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await this.subscriptionService.delete(id);

      res.send();
    } catch (error) {
      this.handleExeption(error, res);
    }
  }
}
