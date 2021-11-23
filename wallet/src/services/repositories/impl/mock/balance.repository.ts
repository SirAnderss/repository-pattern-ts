import db from '../../../../common/persistence/mock.persistence';
import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';

export class BalanceMockRepository implements BalanceRepository {
  public async all(): Promise<Balance[]> {
    const table = db.balance as Balance[];

    return table ? Object.assign([...table]) : null;
  }

  public async find(id: number): Promise<Balance | null> {
    const table = db.balance as Balance[];

    const result = table.find(entry => entry.id === id);

    return result ? Object.assign(result) : null;
  }

  public async findByUserId(userId: number): Promise<Balance | null> {
    const table = db.balance as Balance[];

    const result = table.find(entry => entry.userId === userId);

    return result ? Object.assign(result) : null;
  }

  public async store(entry: Balance): Promise<void> {
    const table = db.balance as Balance[];
    const now = new Date();

    db._balanceId++;

    table.push({
      id: db._movementId,
      userId: entry.userId,
      amount: entry.amount,
      createdAt: now,
      updatedAt: now
    } as Balance);
  }

  public async update(entry: Balance): Promise<void> {
    const table = db.balance as Balance[];
    const now = new Date();

    const originalEntry = table.find(e => e.id === entry.id);

    if (originalEntry) {
      originalEntry.amount = entry.amount;
      originalEntry.updatedAt = now;
    }
  }

  public async delete(id: number): Promise<void> {
    const table = db.balance as Balance[];

    db.balance = table.filter(entry => entry.id !== id) as any;
  }
}
