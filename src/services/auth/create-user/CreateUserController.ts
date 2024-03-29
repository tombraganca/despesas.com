import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response
        .status(201)
        .json({ message: "User created successfully" });
    } catch (err: HttpException | unknown) {
      if (err instanceof HttpException) {
        return response.status(err.statusCode).json({
          message: err.message || "Unexpected error.",
        });
      }
      return response.status(500).json({
        message: "Unexpected error.",
      });
    }
  }
}
