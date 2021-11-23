import { Application } from 'express';
import { scopePerRequest } from 'awilix-express';

import { asClass, createContainer } from 'awilix';

import { SusbcriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementService } from './services/movement.service';

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  });

  container.register({
    // repositories
    susbcriptionRepository: asClass(SusbcriptionMySQLRepository).scoped(),
    movementRepository: asClass(MovementMySQLRepository).scoped(),
    balanceRepository: asClass(BalanceMySQLRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    // balanceService: asClass(BalanceService).scoped(),
  });

  app.use(scopePerRequest(container));
};
