import { MovementsType } from 'src/common/enums/movements.type';

export interface MovementCreateDto {
  userId: number;
  type: MovementsType;
  amount: number;
}

export interface MovementUpdateDto {
  type: MovementsType;
  amount: number;
}
