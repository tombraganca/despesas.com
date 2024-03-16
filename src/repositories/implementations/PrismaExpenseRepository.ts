import { PrismaClient } from "@prisma/client";
import { IExpenseRepository } from "../IExpenseRepository";
import { Expense } from "../../entities/Expense";

export class PrismaExpenseRepository implements IExpenseRepository {
  private connection: PrismaClient;

  constructor() {
    this.connection = new PrismaClient();
  }

  async save(expense: Expense) {
    await this.connection.expense.create({
      data: {
        id: expense.id,
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        userId: expense.userId,
        createdAt: expense.createdAt
      },
    });
  }

  listByUserId(userId: string) {
    return this.connection.expense.findMany({
      where: {
        userId,
      },
    });
  }

  async update(expense: Expense) {
    await this.connection.expense.update({
      where: {
        id: expense.id,
      },
      data: {
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
      },
    });
  }

  async delete(id: string) {
    await this.connection.expense.delete({
      where: {
        id,
      },
    });
  }
}
