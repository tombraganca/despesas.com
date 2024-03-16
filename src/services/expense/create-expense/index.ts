import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PrismaExpenseRepository } from "../../../repositories/implementations/PrismaExpenseRepository";
import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUserRepository";
import { CreateExpenseController } from "./CreateExpenseController";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

const prismaUsersProvider = new PrismaUsersRepository();
const mailTrapMailProvider = new MailTrapMailProvider();
const prismaExpensesProvider = new PrismaExpenseRepository();
const createExpenseUseCase = new CreateExpenseUseCase(
  prismaUsersProvider,
  prismaExpensesProvider,
  mailTrapMailProvider
);
const createExpenseController = new CreateExpenseController(
  createExpenseUseCase
);

export { createExpenseUseCase, createExpenseController };
