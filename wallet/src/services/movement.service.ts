import { MovementsType } from '../common/enums/movements.type';
import { ApplicationException } from '../common/exceptions/application.exeption';
import { MovementCreateDto } from '../dtos/movement.dto';
import { BalanceRepository } from './repositories/balance.repository';
import { Balance } from './repositories/domain/balance';
import { Movement } from './repositories/domain/movement';
import { MovementRepository } from './repositories/movement.repository';

export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly balanceRepository: BalanceRepository
  ) {}

  public async all(): Promise<Movement[]> {
    return await this.movementRepository.all();
  }

  public async find(id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id);
  }

  public async store(entry: MovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.find(entry.userId);

    if (entry.type === MovementsType.income) {
      await this.income(entry, balance);
    } else if (entry.type === MovementsType.outcome) {
      await this.outcome(entry, balance);
    } else {
      throw new ApplicationException('Invalid movement type.');
    }
  }

  private async income(
    entry: MovementCreateDto,
    balance: Balance | null
  ): Promise<void> {
    if (!balance) {
      await this.balanceRepository.store({
        userId: entry.userId,
        amount: entry.amount
      } as unknown as Balance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }

    await this.movementRepository.store(entry as Movement);
  }

  private async outcome(
    entry: MovementCreateDto,
    balance: Balance | null
  ): Promise<void> {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User doesn`t have enough funds.');
    } else {
      balance.amount -= entry.amount;
      await this.balanceRepository.update(balance);

      await this.movementRepository.store(entry as Movement);
    }
  }
}
