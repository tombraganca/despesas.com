
import { User } from "../../../entities/User";
import { IGenerateTokenProvider } from "../../../providers/IGenerateTokenProvider";
import { UserRepository } from "../../../repositories/IUserRepository";
import { CreateUserRequestDTO } from "./AuthenticateUserDTO";
import { RefreshToken } from "../../../entities/RefreshToken";
import { IGenerateRefreshTokenProvider } from "../../../providers/IGenerateRefreshTokenProvider";
import { RefreshTokenRepository } from "../../../repositories/IRefreshTokenRepository";
import { HttpException } from "../../../handler/HttpErro";

export class AuthenticateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private refreshTokenRepository: RefreshTokenRepository,
        private refreshTokenProvider: IGenerateRefreshTokenProvider,
        private tokenProvider: IGenerateTokenProvider,
    ) { }

    async execute(data: CreateUserRequestDTO) {

        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (!userAlreadyExists) {
            throw new HttpException('Email or password incorrect.', 401);
        }

        const user = new User(userAlreadyExists, userAlreadyExists.id);

        const passwordMatch = await user.comparePassword(data.password);

        if (!passwordMatch) {
            throw new HttpException('Email or password incorrect.', 401);
        }

        await this.refreshTokenRepository.deleteManyByUserId(user.id);
        const token = await this.tokenProvider.generateToken({ id: user.id });

        const refreshToken = new RefreshToken({ userId: user.id, expiresIn: 0 });
        await this.refreshTokenProvider.execute(refreshToken);

        return { user: { id: user.id, name: user.name, email: user.email }, token, refreshToken: refreshToken.id };
    }
}