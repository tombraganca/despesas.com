import { IExpenseRepository } from "../../../repositories/IExpenseRepository";
import { ListExpenseDTO } from "./ListExpenseDTO";
import { HttpException } from "../../../handler/HttpErro";

export class ListExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(data: ListExpenseDTO) {
    const { userId } = data;

    const expenses = await this.expenseRepository.listByUserId(userId);

    if (!expenses) {
      throw new HttpException("Expense empty", 404);
    }

    return expenses;
  }
}
