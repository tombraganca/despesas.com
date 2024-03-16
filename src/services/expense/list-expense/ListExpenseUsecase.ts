import { ExpenseRepository } from "../../../repositories/IExpenseRepository";
import { ListExpenseDTO } from "./ListExpenseDTO";
import { HttpException } from "../../../handler/HttpErro";

export class ListExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute(data: ListExpenseDTO) {
    const { userId } = data;

    const expenses = await this.expenseRepository.listByUserId(userId);

    return expenses;
  }
}
