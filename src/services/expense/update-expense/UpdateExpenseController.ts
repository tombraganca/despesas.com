import { Request, Response } from "express";
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class UpdateExpenseController {
  constructor(private updateExpenseUseCase: UpdateExpenseUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { userId } = request.headers as { userId: string };
      const { id } = request.params;
      const { title, description, amount, date } = request.body;

      const expense = await this.updateExpenseUseCase.execute({
        id,
        title,
        description,
        amount,
        date,
        userId: userId,
      });

      return response.status(200).json({
        message: "Expense updated successfully",
      });
    } catch (error: HttpException | any) {
      if (error instanceof HttpException) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({ error: "Unexpected error" });
    }
  }
}
