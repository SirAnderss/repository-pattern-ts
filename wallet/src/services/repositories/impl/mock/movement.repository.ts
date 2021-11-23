import db from '../../../../common/persistence/mock.persistence';
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMockRepository implements MovementRepository {
  public async all(): Promise<Movement[]> {
    const table = db.movements as Movement[];

    return table ? Object.assign([...table]) : null;
  }

  public async find(id: number): Promise<Movement | null> {
    const table = db.movements as Movement[];

    const result = table.find(entry => entry.id === id);

    return result ? Object.assign(result) : null;
  }

  public async store(entry: Movement): Promise<void> {
    const table = db.movements as Movement[];
    const now = new Date();

    db._movementId++;

    table.push({
      id: db._movementId,
      type: entry.type,
      amount: entry.amount,
      createdAt: now,
      updatedAt: now
    } as Movement);
  }

  public async update(entry: Movement): Promise<void> {
    const table = db.movements as Movement[];
    const now = new Date();

    const originalEntry = table.find(e => e.id === entry.id);

    if (originalEntry) {
      originalEntry.type = entry.type;
      originalEntry.amount = entry.amount;
      originalEntry.updatedAt = now;
    }
  }

  public async delete(id: number): Promise<void> {
    const table = db.movements as Movement[];

    db.movements = table.filter(entry => entry.id !== id) as any;
  }
}
