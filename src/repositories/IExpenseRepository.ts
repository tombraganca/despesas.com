import { Expense } from "../entities/Expense";

export interface ExpenseRepository {
  save: (expense: Expense) => Promise<void>;
  listByUserId: (userId: string) => Promise<Expense[]>;
  findById: (id: string) => Promise<Expense | null>;
  update: (expense: Expense) => Promise<Expense>;
  delete: (id: string) => Promise<void>;
}