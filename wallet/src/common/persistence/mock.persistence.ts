import { MovementsType } from '../enums/movements.type';

const db = {
  balance: [
    {
      id: 1,
      userId: 1,
      amount: 90
    },
    {
      id: 2,
      userId: 2,
      amount: 170
    },
    {
      id: 3,
      userId: 3,
      amount: 100
    }
  ],
  movements: [
    {
      id: 1,
      userId: 1,
      type: MovementsType.income,
      amount: 100
    },
    {
      id: 2,
      userId: 1,
      type: MovementsType.outcome,
      amount: 10
    },
    {
      id: 3,
      userId: 2,
      type: MovementsType.income,
      amount: 100
    },
    {
      id: 4,
      userId: 2,
      type: MovementsType.income,
      amount: 70
    },
    {
      id: 5,
      userId: 3,
      type: MovementsType.income,
      amount: 100
    }
  ],
  subsciptions: [
    {
      userId: 1,
      code: 'OXC4567FT',
      amount: 100,
      cron: '0 0 12 8 1/1 ? *'
    },
    {
      userId: 1,
      code: 'DEFRT45ZX',
      amount: 85,
      cron: '0 0 12 8 1/1 ? *'
    },
    {
      userId: 2,
      code: 'DEFRT45OP',
      amount: 100,
      cron: '0 0 12 8 1/1 ? *'
    }
  ],
  _balanceId: 0,
  _movementId: 0,
  _subscriptionId: 0
};

db._balanceId = db.balance.length;

export default db;
