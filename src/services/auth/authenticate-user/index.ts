
import { GenerateRefreshTokenProvider } from "../../../providers/implementations/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../../providers/implementations/GenerateTokenProvider";
import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUserRepository";
import { PostgresRefreshTokenRepository } from "../../../repositories/implementations/PrismaRefreshTokenRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


const userRepository = new PrismaUsersRepository();
const refreshTokenRepository = new PostgresRefreshTokenRepository();

const refreshTokenProvider = new GenerateRefreshTokenProvider();
const tokenProvider = new GenerateTokenProvider();

const authenticateUser = new AuthenticateUserUseCase(userRepository, refreshTokenRepository, refreshTokenProvider, tokenProvider);

const authenticateController = new AuthenticateUserController(authenticateUser);

export { authenticateUser, authenticateController };

