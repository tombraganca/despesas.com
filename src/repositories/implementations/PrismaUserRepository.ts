import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { UserRepository } from "../IUserRepository";

export class PrismaUsersRepository implements UserRepository {
    private connection: PrismaClient;

    constructor() {
        this.connection = new PrismaClient();
    }

    async save(user: User): Promise<void> {

        await this.connection.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                id: user.id,
                createdAt: user.createdAt,
            }
        });
    }

    async findByEmail(email: string): Promise<User | any> {
        return await this.connection.user.findFirst({
            where: {
                email
            }
        });
    }

    async findByUserId(userId: string): Promise<User | any> {
        return await this.connection.user.findFirst({
            where: {
                id: userId
            }
        });
    }

}