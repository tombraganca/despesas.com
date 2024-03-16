import { Expense } from "../../../entities/Expense";
import { HttpException } from "../../../handler/HttpErro";
import { ExpenseRepository } from "../../../repositories/IExpenseRepository";
import { UpdateExpenseDTO } from "./UpdateExpenseDTO";

export class UpdateExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute(data: UpdateExpenseDTO) {
    const { id, title, description, amount, date, userId } = data;

    const hasExpense = await this.expenseRepository.findById(id);

    if (!hasExpense) {
      throw new HttpException("Expense not found", 404);
    }

    if (hasExpense.userId !== userId) {
      throw new HttpException(
        "You don't have permission to update this expense",
        403
      );
    }

    const updatedExpense = new Expense(
      {
        title,
        description,
        amount,
        date: new Date(date),
        userId,
      },
      id
    );

    await this.expenseRepository.update(updatedExpense);
  }
}
