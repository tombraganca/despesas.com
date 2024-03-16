import { PrismaExpenseRepository } from "../../../repositories/implementations/PrismaExpenseRepository";
import { ListExpenseController } from "./ListExpenseController";
import { ListExpenseUseCase } from "./ListExpenseUsecase";

const prismaExpensesProvider = new PrismaExpenseRepository();
const listExpenseUseCase = new ListExpenseUseCase(prismaExpensesProvider);
const listExpenseController = new ListExpenseController(listExpenseUseCase);

export { listExpenseUseCase, listExpenseController };
