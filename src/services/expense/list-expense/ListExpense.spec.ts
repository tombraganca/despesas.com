import { describe, it } from "vitest";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { InMemoryExpenseRepository } from "../../../test/repositories-test/InMemoryExpenseRepository";
import { ListExpenseUseCase } from "./ListExpenseUsecase";
import { User } from "../../../entities/User";
import { Expense } from "../../../entities/Expense";

describe("ListExpenseUseCase", () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const inMemoryExpenseRepository = new InMemoryExpenseRepository();
  const listExpenseUseCase = new ListExpenseUseCase(inMemoryExpenseRepository);

  const user = new User({
    name: "Test",
    email: "teste@teste.com",
    password: "123",
  });

  const expense = new Expense({
    title: "Test",
    description: "Test",
    amount: 100,
    date: new Date(),
    userId: user.id,
  });

  inMemoryUserRepository.save(user);
  inMemoryExpenseRepository.save(expense);
  inMemoryExpenseRepository.save(expense);
  inMemoryExpenseRepository.save(expense);

  it("should list all expenses of a user", () => {});

  it("should throw an error if the user does not exist", () => {});

  it("should throw empty if the user has no expenses", () => {});
});
