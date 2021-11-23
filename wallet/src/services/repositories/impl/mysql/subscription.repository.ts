import conn from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subcription.repository';

export class SusbcriptionMySQLRepository implements SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const [rows] = await conn.execute('SELECT * FROM wallet_subscription');

    return rows as Subscription[];
  }

  public async find(id: number): Promise<Subscription | null> {
    const [rows]: any = await conn.execute(
      'SELECT * FROM wallet_subscription WHERE id = ?',
      [id]
    );

    if (rows.length) {
      return rows[0] as Subscription;
    }

    return null;
  }

  public async findByUserAndCode(
    userId: number,
    code: string
  ): Promise<Subscription | null> {
    const [rows]: any = await conn.execute(
      'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
      [userId, code]
    );

    if (rows.length) {
      return rows[0] as Subscription;
    }

    return null;
  }

  public async store(entry: Subscription): Promise<void> {
    const now = new Date();

    await conn.execute(
      'INSERT INTO wallet_subscription (user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
      [entry.userId, entry.code, entry.amount, entry.cron, now]
    );
  }

  public async update(entry: Subscription): Promise<void> {
    const now = new Date();

    await conn.execute(
      'UPDATE wallet_subscription SET code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.code, entry.amount, entry.cron, now, entry.id]
    );
  }

  public async delete(id: number): Promise<void> {
    await conn.execute('DELETE wallet_subscription WHERE id = ?', [id]);
  }
}
