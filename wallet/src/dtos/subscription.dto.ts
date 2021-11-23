export interface SubscriptionCreateDto {
  userId: number;
  code: string;
  amount: number;
  cron: string;
}

export interface SubscriptionUpdateDto {
  code: string;
  amount: number;
  cron: string;
}
