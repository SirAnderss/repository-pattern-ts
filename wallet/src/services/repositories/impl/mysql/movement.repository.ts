import conn from '../../../../common/persistence/mysql.persistence';
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMySQLRepository implements MovementRepository {
  public async all(): Promise<Movement[]> {
    const [rows] = await conn.execute('SELECT * FROM wallet_movement');

    return rows as Movement[];
  }

  public async find(id: number): Promise<Movement | null> {
    const [rows]: any = await conn.execute(
      'SELECT * FROM wallet_movement where id = ?',
      [id]
    );

    if (rows.length) {
      return rows[0] as Movement;
    }

    return null;
  }

  public async store(entry: Movement): Promise<void> {
    const now = new Date();

    await conn.execute(
        'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)',
        [entry.userId, entry.type, entry.amount, now]
    );
  }

  public async update(entry: Movement): Promise<void> {
    const now = new Date();

    await conn.execute(
      'UPDATE wallet_movement SET type = ?, amount = ? updated_at = ? WHERE id = ?',
      [entry.type, entry.amount, now, entry.id]
    );
  }

  public async delete(id: number): Promise<void> {
    await conn.execute('DELETE wallet_movement WHERE id = ?', [id]);
  }
}
