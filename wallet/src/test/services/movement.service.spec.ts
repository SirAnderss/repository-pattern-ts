import { describe, it } from 'mocha';
import { MovementCreateDto } from '../../dtos/movement.dto';
import { MovementService } from '../../services/movement.service';
import { BalanceMockRepository } from '../../services/repositories/impl/mock/balance.repository';
import { MovementMockRepository } from '../../services/repositories/impl/mock/movement.repository';

import assert = require('assert');

const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository()
);

describe('Movement.Service', () => {
  describe('#store()', () => {
    it('tries to register an income movement', async () => {
      await movementService.store({
        userId: 1,
        type: 0,
        amount: 100
      } as MovementCreateDto);
    });

    it('tries to register an outcome movement', async () => {
      await movementService.store({
        userId: 1,
        type: 1,
        amount: 100
      } as MovementCreateDto);
    });

    it('tries to register an outcome movement with insuficient balance', async () => {
      try {
        await movementService.store({
          userId: 1,
          type: 1,
          amount: 200
        } as MovementCreateDto);
      } catch (error ) {
        assert.equal(error.message, 'User doesn`t have enough funds.');
      }
    });

    it('tries to register an unexpected moveement', async () => {
      try {
        await movementService.store({
          userId: 1,
          type: 999,
          amount: 200
        } as MovementCreateDto);
      } catch (error ) {
        assert.equal(error.message, 'Invalid movement type.');
      }
    });
  });
});
