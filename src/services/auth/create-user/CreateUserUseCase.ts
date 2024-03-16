import { User } from "../../../entities/User";
import { HttpException } from "../../../handler/HttpErro";
import { IMailProvider } from "../../../providers/IMailProvider";
import { TEMPLATE_EMAIL } from "../../../providers/configs/TempleteEmail";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<void> {
    if (!this.emailValidate(data.email)) {
      throw new HttpException("Invalid email.", 400);
    }

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new HttpException("User already exists.", 409);
    }

    const user = new User(data);

    await user.hashPassword();

    await this.userRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe Despesa.com",
        email: "despesadotcom@dev.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: TEMPLATE_EMAIL,
    });
  }

  private emailValidate(email: string): boolean {
    return email.includes("@");
  }
}
