import conn from '../../../../common/persistence/mysql.persistence';
import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';

export class BalanceMySQLRepository implements BalanceRepository {
  public async all(): Promise<Balance[]> {
    const [rows] = await conn.execute('SELECT * FROM wallet_balance');

    return rows as Balance[];
  }

  public async find(id: number): Promise<Balance | null> {
    const [rows]: any = await conn.execute(
      'SELECT * FROM wallet_balance where id = ?',
      [id]
    );

    if (rows.length) {
      return rows[0] as Balance;
    }

    return null;
  }

  public async findByUserId(userId: number): Promise<Balance | null> {
    const [rows]: any = await conn.execute(
      'SELECT * FROM wallet_balance where user_id = ?',
      [userId]
    );

    if (rows.length) {
      return rows[0] as Balance;
    }

    return null;
  }

  public async store(entry: Balance): Promise<void> {
    const now = new Date();

    await conn.execute(
      'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
      [entry.userId, entry.amount, now]
    );
  }

  public async update(entry: Balance): Promise<void> {
    const now = new Date();

    await conn.execute(
      'UPDATE wallet_balance SET amount = ? updated_at = ? WHERE id = ?',
      [entry.amount, now, entry.id]
    );

  }

  public async delete(id: number): Promise<void> {
    await conn.execute('DELETE wallet_balance WHERE id = ?', [id]);
  }
}
