import { describe, expect, it } from "vitest";
import { InMemoryExpenseRepository } from "../../../test/repositories-test/InMemoryExpenseRepository";
import { InMemoryUserRepository } from "../../../test/repositories-test/InMemoryUserRepository";
import { User } from "../../../entities/User";
import { Expense } from "../../../entities/Expense";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";
import { HttpException } from "../../../handler/HttpErro";

describe("DeleteExpense", () => {
  const inMemoryExpenseRepository = new InMemoryExpenseRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const deleteExpenseUseCase = new DeleteExpenseUseCase(
    inMemoryExpenseRepository
  );

  const user = new User({
    name: "John Doe",
    email: "teste@teste.com",
    password: "123456",
  });

  inMemoryUserRepository.save(user);

  it("Shoul delete an expense", async () => {
    const newExpense = new Expense({
      userId: user.id,
      title: "Test",
      amount: 100,
      date: new Date(),
      description: "Test",
    });

    await inMemoryExpenseRepository.save(newExpense);

    await deleteExpenseUseCase.execute({ id: newExpense.id, userId: user.id });

    const hasExpense = await inMemoryExpenseRepository.findById(newExpense.id);

    expect(hasExpense).toBe(null);
  });

  it("Should not delete an expense if it does not exist", async () => {
    const newExpense = new Expense({
      userId: user.id,
      title: "Test",
      amount: 100,
      date: new Date(),
      description: "Test",
    });

    await inMemoryExpenseRepository.save(newExpense);

    try {
      await deleteExpenseUseCase.execute({ id: "any_id", userId: user.id });
    } catch (error: HttpException | unknown) {
      if (error instanceof HttpException) {
        expect(error.message).toBe("Expense not found");
        expect(error.statusCode).toBe(404);
        return;
      }
      throw new Error("Unexpected error");
    }
  });

  it("Should not delete an expense if the user is not allowed", async () => {
    const newExpense = new Expense({
      userId: user.id,
      title: "Test",
      amount: 100,
      date: new Date(),
      description: "Test",
    });

    await inMemoryExpenseRepository.save(newExpense);
    try {
      await deleteExpenseUseCase.execute({
        id: newExpense.id,
        userId: "any_id",
      });
    } catch (error: HttpException | unknown) {
      if (error instanceof HttpException) {
        expect(error.message).toBe(
          "You are not allowed to delete this expense"
        );
        expect(error.statusCode).toBe(403);
        return;
      }
      throw new Error("Unexpected error");
    }
  });
});
