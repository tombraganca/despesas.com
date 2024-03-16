import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class AuthenticateUserController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        try {
            const userAuth = await this.authenticateUserUseCase.execute({ email, password });

            return response.json({ ...userAuth });
        } catch (err: HttpException | unknown) {
            if(err instanceof HttpException){

                return response.status(err.statusCode).json({
                    message: err.message
                });
            }

            return response.status(500).json({
                message: 'Unexpected error.'
            });
        }
    }
}