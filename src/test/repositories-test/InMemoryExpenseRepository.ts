import { Expense } from "@prisma/client";
import { IExpenseRepository } from "../../repositories/IExpenseRepository";

export class InMemoryExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = [];

  async save(expense: Expense): Promise<void> {
    this.expenses.push(expense);
  }

  async listByUserId(userId: string): Promise<Expense[]> {
    return this.expenses.filter((expense) => expense.userId === userId);
  }

  async update(expense: Expense): Promise<void> {
    this.expenses = this.expenses.map((_expense) =>
      _expense.id === expense.id ? expense : _expense
    );
  }

  async delete(id: string): Promise<void> {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
}
