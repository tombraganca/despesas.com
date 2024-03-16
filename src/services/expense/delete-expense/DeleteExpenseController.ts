import { Request, Response } from "express";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class DeleteExpenseController {
  constructor(private deleteExpenseService: DeleteExpenseUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { userId } = request.headers as { userId: string };

      await this.deleteExpenseService.execute({ id, userId });

      return response.status(200).json({ message: "Expense deleted" });
    } catch (error: HttpException | unknown) {
      if (error instanceof HttpException)
        return response
          .status(error.statusCode)
          .json({ message: error.message });

      return response.status(500).json({ message: "Unexpected error" });
    }
  }
}
