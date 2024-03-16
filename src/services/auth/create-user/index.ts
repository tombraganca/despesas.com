
import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PrismaUsersRepository } from "../../../repositories/implementations/PrismaUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const prismaUsersProvider = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    prismaUsersProvider,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };