import { PrismaExpenseRepository } from "../../../repositories/implementations/PrismaExpenseRepository";
import { DeleteExpenseController } from "./DeleteExpenseController";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";

const prismaExpenseRepository = new PrismaExpenseRepository();
const deleteExpenseUseCase = new DeleteExpenseUseCase(prismaExpenseRepository);
const deleteExpenseController = new DeleteExpenseController(
  deleteExpenseUseCase
);

export { deleteExpenseController };
