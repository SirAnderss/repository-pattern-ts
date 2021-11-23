import db from '../../../../common/persistence/mock.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subcription.repository';

export class SusbcriptionMockRepository implements SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const table = db.subsciptions as Subscription[];

    return table ? Object.assign([...table]) : null;
  }

  public async find(id: number): Promise<Subscription | null> {
    const table = db.subsciptions as Subscription[];

    const result = table.find(entry => entry.id === id);

    return result ? Object.assign(result) : null;
  }

  public async findByUserAndCode(
    userId: number,
    code: string
  ): Promise<Subscription | null> {
    const table = db.subsciptions as Subscription[];

    const byUser = table.filter(entry => entry.userId === userId);

    if (byUser) {
      const byCode = byUser.find(entry => entry.code === code);

      return byCode ? Object.assign(byCode) : null;
    }

    return null;
  }

  public async store(entry: Subscription): Promise<void> {
    const table = db.subsciptions as Subscription[];
    const now = new Date();

    db._subscriptionId++;

    table.push({
      id: db._subscriptionId,
      userId: entry.userId,
      code: entry.code,
      amount: entry.amount,
      cron: entry.cron,
      createdAt: now,
      updatedAt: now
    } as Subscription);
  }

  public async update(entry: Subscription): Promise<void> {
    const table = db.subsciptions as Subscription[];
    const now = new Date();

    const originalEntry = table.find(e => e.id === entry.id);

    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      originalEntry.updatedAt = now;
    }
  }

  public async delete(id: number): Promise<void> {
    const table = db.subsciptions as Subscription[];

    db.subsciptions = table.filter(entry => entry.id !== id) as any;
  }
}
