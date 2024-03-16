import { Expense } from "../entities/Expense";

export interface IExpenseRepository {
  save: (expense: Expense) => Promise<void>;
  listByUserId: (userId: string) => Promise<Expense[]>;
  update: (expense: Expense) => Promise<void>;
  delete: (id: string) => Promise<void>;
}