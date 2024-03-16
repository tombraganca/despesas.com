import { describe, expect, it } from "vitest";
import { InMemoryExpenseRepository } from "../../../test/repositories-test/InMemoryExpenseRepository";
import { CreateExpenseRequestDTO } from "./CreateExpenseDTO";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { User } from "../../../entities/User";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";
import { MailTestProvider } from "../../../test/providers-test/MailTestProvider";
import { HttpException } from "../../../handler/HttpErro";

describe("CreateExpenseUseCase", () => {
  ///Colocar validação nos requests do CRUD (usuário existe, data não é futuro, valor não é negativo, descrição tem até 191 caracteres).

  const user = new User({
    email: "teste@teste.com",
    name: "Teste",
    password: "123456",
  });

  it("should be able to create an expense", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    await inMemoryUserRepository.save(user);

    const data: CreateExpenseRequestDTO = {
      description: "Test expense",
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: user.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    await createExpenseUseCase.execute(data);

    const expenses = await inMemoryExpenseRepository.listByUserId(user.id);

    expect(expenses.length).toBe(1);
    expect(expenses[0].description).toBe("Test expense");
    expect(expenses[0].date).toEqual(new Date("2021-10-10"));
    expect(expenses[0].amount).toBe(100);
    expect(expenses[0].title).toBe("Test expense");
    expect(expenses[0].userId).toBe(user.id);
  });

  it("should not be able to create an expense with invalid user", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    const data: CreateExpenseRequestDTO = {
      description: "Test expense",
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: "123",
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    try {
      await createExpenseUseCase.execute(data);
    } catch (error: HttpException | any) {
      expect(error.message).toBe("User not found");
      expect(error.statusCode).toBe(404);
    }
  });

  it("should not be able to create an expense with invalid value", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    await inMemoryUserRepository.save(user);

    const data: CreateExpenseRequestDTO = {
      description: "Test expense",
      date: "2021-10-10",
      amount: -100,
      title: "Test expense",
      userId: user.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    try {
      await createExpenseUseCase.execute(data);
    } catch (error: HttpException | any) {
      expect(error.message).toBe("Amount should not be less than 0");
      expect(error.statusCode).toBe(400);
    }
  });

  it("should not be able to create an expense with invalid description", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    await inMemoryUserRepository.save(user);

    const data: CreateExpenseRequestDTO = {
      description: Array(200).fill("a").join(""),
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: user.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    try {
      await createExpenseUseCase.execute(data);
    } catch (error: HttpException | any) {
      expect(error.message).toBe(
        "Description should not be longer than 191 characters"
      );
      expect(error.statusCode).toBe(400);
    }
  });

  it("shoul not be able to create an expense with negative value", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    await inMemoryUserRepository.save(user);

    const data: CreateExpenseRequestDTO = {
      description: "Test expense",
      date: "2021-10-10",
      amount: -100,
      title: "Test expense",
      userId: user.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    try {
      await createExpenseUseCase.execute(data);
    } catch (error: HttpException | any) {
      expect(error.message).toBe("Amount should not be less than 0");
      expect(error.statusCode).toBe(400);
    }
  });

  it("should not be able to create an expense with future date", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    await inMemoryUserRepository.save(user);

    const data: CreateExpenseRequestDTO = {
      description: "Test expense",
      date: "2022-10-10",
      amount: 100,
      title: "Test expense",
      userId: user.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    try {
      await createExpenseUseCase.execute(data);
    } catch (error: HttpException | any) {
      expect(error.message).toBe("Date should not be in the future");
      expect(error.statusCode).toBe(400);
    }
  });
});
