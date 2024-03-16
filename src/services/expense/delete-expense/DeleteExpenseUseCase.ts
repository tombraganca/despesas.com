import { HttpException } from "../../../handler/HttpErro";
import { ExpenseRepository } from "../../../repositories/IExpenseRepository";
import { DeleteExpenseDTO } from "./DeleteExpenseDTO";

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute({ id, userId }: DeleteExpenseDTO): Promise<void> {
    const hasExpense = await this.expenseRepository.findById(id);

    if (!hasExpense) {
      throw new HttpException("Expense not found", 404);
    }

    if (hasExpense.userId !== userId) {
      throw new HttpException(
        "You are not allowed to delete this expense",
        403
      );
    }

    await this.expenseRepository.delete(id);
  }
}
