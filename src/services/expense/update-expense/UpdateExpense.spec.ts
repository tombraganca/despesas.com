import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { InMemoryExpenseRepository } from "../../../test/repositories-test/InMemoryExpenseRepository";
import { User } from "../../../entities/User";
import { CreateExpenseUseCase } from "../create-expense/CreateExpenseUseCase";
import { MailTestProvider } from "../../../test/providers-test/MailTestProvider";
import { HttpException } from "../../../handler/HttpErro";
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";
import { beforeEach } from "node:test";

describe("UpdateExpense", () => {
  const body = {
    title: "New title",
    description: "New description",
    amount: 1000,
    date: "2022-01-01",
  };

  const user = {
    name: "Test user",
    email: "teste@teste.com",
    password: "123456",
  };

  it("should update an expense", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    const newUser = new User(user);

    await inMemoryUserRepository.save(newUser);

    const data = {
      description: "Test expense",
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: newUser.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    await createExpenseUseCase.execute(data);

    const expenses = await inMemoryExpenseRepository.listByUserId(newUser.id);

    expect(expenses.length).toBe(1);
    expect(expenses[0].description).toBe("Test expense");
    expect(expenses[0].date).toEqual(new Date("2021-10-10"));
    expect(expenses[0].amount).toBe(100);
    expect(expenses[0].title).toBe("Test expense");
    expect(expenses[0].userId).toBe(newUser.id);

    const dataToUpdate = {
      id: expenses[0].id,
      title: "New title",
      description: "New description",
      amount: 1000,
      date: "2022-01-01",
      userId: newUser.id,
    };

    const updateExpenseUseCase = new UpdateExpenseUseCase(
      inMemoryExpenseRepository
    );

    await updateExpenseUseCase.execute(dataToUpdate);

    expect(inMemoryExpenseRepository.findById(expenses[0].id)).resolves.toEqual(
      {
        id: expenses[0].id,
        title: "New title",
        description: "New description",
        amount: 1000,
        date: new Date("2022-01-01"),
        userId: newUser.id,
      }
    );
  });

  it("should not update an expense if it does not exist", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    const newUser = new User(user);

    await inMemoryUserRepository.save(newUser);

    const data = {
      id: "123",
      description: "Test expense",
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: newUser.id,
    };

    const createExpenseUseCase = new UpdateExpenseUseCase(
      inMemoryExpenseRepository
    );

    try {
      await createExpenseUseCase.execute(data);
      throw new Error("Should not pass here");
      //console.log('passoi!!!!!!!!!!!!!')
    } catch (error: HttpException | any) {
      expect(error.message).toBe("Expense not found");
      expect(error.statusCode).toBe(404);
    }
  });

  it("should not update an expense if the user does not have permission", async () => {
    const inMemoryExpenseRepository = new InMemoryExpenseRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const mailTestProvider = new MailTestProvider();

    const newUser = new User(user);

    await inMemoryUserRepository.save(newUser);

    const data = {
      description: "Test expense",
      date: "2021-10-10",
      amount: 100,
      title: "Test expense",
      userId: newUser.id,
    };

    const createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
      mailTestProvider
    );

    await createExpenseUseCase.execute(data);

    const expenses = await inMemoryExpenseRepository.listByUserId(newUser.id);

    expect(expenses.length).toBe(1);
    expect(expenses[0].description).toBe("Test expense");
    expect(expenses[0].date).toEqual(new Date("2021-10-10"));
    expect(expenses[0].amount).toBe(100);
    expect(expenses[0].title).toBe("Test expense");
    expect(expenses[0].userId).toBe(newUser.id);

    const dataToUpdate = {
      id: expenses[0].id,
      title: "New title",
      description: "New description",
      amount: 1000,
      date: "2022-01-01",
      userId: "123",
    };

    const updateExpenseUseCase = new UpdateExpenseUseCase(
      inMemoryExpenseRepository
    );

    try {
      await updateExpenseUseCase.execute(dataToUpdate);
    } catch (error: HttpException | any) {
      expect(error.message).toBe(
        "You don't have permission to update this expense"
      );
      expect(error.statusCode).toBe(403);
    }
  });
});
