import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class CreateExpenseController {
  constructor(private createExpenseService: CreateExpenseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { description, amount, title, date } = request.body;
      const userId = request.headers.userId as string;

      await this.createExpenseService.execute({
        description,
        amount,
        title,
        userId,
        date,
      });

      return response
        .status(201)
        .json({ message: "Expense created successfully" });
    } catch (error: HttpException | unknown) {
      console.error(error);
      if (error instanceof HttpException) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({ message: "Unexpected error" });
    }
  }
}
