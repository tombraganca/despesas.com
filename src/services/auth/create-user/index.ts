
import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUsersProvider = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUsersProvider,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };