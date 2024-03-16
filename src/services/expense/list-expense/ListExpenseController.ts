import { Request, Response } from "express";
import { ListExpenseUseCase } from "./ListExpenseUsecase";
import { HttpException } from "../../../handler/HttpErro";

export class ListExpenseController {
  constructor(private listExpenseUseCase: ListExpenseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.headers as { userId: string };

      const expenses = await this.listExpenseUseCase.execute({ userId });

      return response.json(expenses);
    } catch (error: HttpException | unknown) {
      if (error instanceof HttpException) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }

      return response.status(500).json({ message: "Unexpected error." });
    }
  }
}
