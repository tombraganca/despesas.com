import { Expense } from "../../../entities/Expense";
import { HttpException } from "../../../handler/HttpErro";
import { IMailProvider } from "../../../providers/IMailProvider";
import {
  TEMPLATE_EMAIL,
  TEMPLATE_EMAIL_ESPENSE,
} from "../../../providers/configs/TempleteEmail";
import { IExpenseRepository } from "../../../repositories/IExpenseRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { CreateExpenseRequestDTO } from "./CreateExpenseDTO";

export class CreateExpenseUseCase {
  constructor(
    private userRepository: IUserRepository,
    private expenseRepository: IExpenseRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: CreateExpenseRequestDTO) {
    const user = await this.userRepository.findByUserId(data.userId);

    if (!user) {
      throw new HttpException("User not found", 404);
    }

    const expense = new Expense({ ...data, date: new Date(data.date) });

    await this.expenseRepository.save(expense);

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: "Equipe Despesa.com",
        email: "despesadotcom@dev.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: TEMPLATE_EMAIL_ESPENSE({
        name: user.name,
        amount: expense.amount,
        title: expense.title,
        details: expense.description,
        date: expense.date,
      }),
    });
  }
}
