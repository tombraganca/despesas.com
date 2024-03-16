import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import { HttpException } from "../../../handler/HttpErro";

export class RefreshTokenUserController {

    constructor(private refreshTokenUserUseCase: RefreshTokenUserUseCase) { }

    async handle(request: Request, response: Response) {
        const { refreshToken } = request.body;

        try {
            const token = await this.refreshTokenUserUseCase.execute({ refreshToken });
            return response.json(token);

        } catch (err: HttpException | unknown) {
            if(err instanceof HttpException) {

                return response.status(401).json({
                    message: err.message
                });
            }

            return response.status(500).json({
                message: 'Unexpected error.'
            });
        }
    }
}