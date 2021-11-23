import { ApplicationException } from '../common/exceptions/application.exeption';
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto
} from '../dtos/subscription.dto';
import { Subscription } from './repositories/domain/subscription';
import { SubscriptionRepository } from './repositories/subcription.repository';

export class SubscriptionService {
  constructor(
    private readonly susbcriptionRepository: SubscriptionRepository
  ) {}

  public async all(): Promise<Subscription[]> {
    return await this.susbcriptionRepository.all();
  }

  public async find(id: number): Promise<Subscription | null> {
    return await this.susbcriptionRepository.find(id);
  }

  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const storedEntry = await this.susbcriptionRepository.findByUserAndCode(
      entry.userId,
      entry.code
    );

    if (!storedEntry) {
      await this.susbcriptionRepository.store(entry as Subscription);
    } else {
      throw new ApplicationException('User subscription already exists.');
    }
  }

  public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const subscription = await this.susbcriptionRepository.find(id);

    if (subscription) {
      subscription.code = entry.code;
      subscription.amount = entry.amount;
      subscription.cron = entry.cron;

      await this.susbcriptionRepository.update(subscription);
    } else {
      throw new ApplicationException('User subscription not found.');
    }
  }

  public async delete(id: number): Promise<void> {
    return await this.susbcriptionRepository.delete(id);
  }
}
