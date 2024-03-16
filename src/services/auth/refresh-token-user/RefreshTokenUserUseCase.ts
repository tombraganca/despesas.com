import dayjs from "dayjs";
import { RefreshTokenRepository } from "../../../repositories/IRefreshTokenRepository";
import { RefreshTokenUserDTO } from "./RefreshTokenUserDTO";
import { IGenerateRefreshTokenProvider } from "../../../providers/IGenerateRefreshTokenProvider";
import { IGenerateTokenProvider } from "../../../providers/IGenerateTokenProvider";
import { RefreshToken } from "../../../entities/RefreshToken";
import { HttpException } from "../../../handler/HttpErro";



export class RefreshTokenUserUseCase {

    constructor(
        private refreshTokenRepository: RefreshTokenRepository,
        private generateTokenProvider: IGenerateTokenProvider,
        private generateRefreshTokenProvider: IGenerateRefreshTokenProvider
    ) { }

    async execute({ refreshToken }: RefreshTokenUserDTO) {

        if (!refreshToken) {
            throw new HttpException("Refresh token is required", 400);
        }

        const refreshTokenExists = await this.refreshTokenRepository.findByRefreshToken(refreshToken);

        if (!refreshTokenExists) {
            throw new HttpException("Invalid refresh token or expired", 401);
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenExists.expiresIn));

        const token = await this.generateTokenProvider.generateToken({
            id: refreshTokenExists.userId
        });

        if (refreshTokenExpired) {
            await this.refreshTokenRepository.deleteManyByUserId(refreshTokenExists.userId);
            const newRefreshToken = new RefreshToken({ userId: refreshTokenExists.userId, expiresIn: 0 });
            this.generateRefreshTokenProvider.execute(newRefreshToken);
            return { token, refreshToken: newRefreshToken.id };
        }

        return { token };

    }
}
