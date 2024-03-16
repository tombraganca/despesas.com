import { PrismaExpenseRepository } from "../../../repositories/implementations/PrismaExpenseRepository";
import { UpdateExpenseController } from "./UpdateExpenseController";
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";

const prismaExpenseRepository = new PrismaExpenseRepository();
const updateExpenseUseCase = new UpdateExpenseUseCase(prismaExpenseRepository);
const updateExpenseController = new UpdateExpenseController(
  updateExpenseUseCase
);

export { updateExpenseUseCase, updateExpenseController };
