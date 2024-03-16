import { ExpenseRepository } from "../../repositories/IExpenseRepository";
import { Expense } from "../../entities/Expense";

export class InMemoryExpenseRepository implements ExpenseRepository {
  private expenses: Expense[] = [];

  async save(expense: Expense): Promise<void> {
    this.expenses.push(expense);
  }

  async listByUserId(userId: string): Promise<Expense[]> {
    return this.expenses.filter((expense) => expense.userId === userId);
  }

  async findById(id: string) {
    return this.expenses.find((expense) => expense.id === id) ?? null;
  }

  async update(expense: Expense): Promise<Expense> {
    this.expenses = this.expenses.map((_expense) =>
      _expense.id === expense.id ? expense : _expense
    );

    return expense;
  }

  async delete(id: string): Promise<void> {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
}
