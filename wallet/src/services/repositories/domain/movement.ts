import { MovementsType } from "src/common/enums/movements.type";

export interface Movement {
  id: number;
  userId: number;
  type: MovementsType;
  amount: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
