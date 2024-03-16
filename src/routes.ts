import { Router } from "express";
import { createUserController } from "./services/auth/create-user";
import { authenticateController } from "./services/auth/authenticate-user";
import { refreshTokenUserController } from "./services/auth/refresh-token-user";
import { MiddlewareAuth } from "./middleware/MiddlewareAuth";
import { createExpenseController } from "./services/expense/create-expense";
import { listExpenseController } from "./services/expense/list-expense";
import { updateExpenseController } from "./services/expense/update-expense";
import { deleteExpenseController } from "./services/expense/delete-expense";

const router = Router();

router.get("/health", (request, response) => {
  return response.status(200).json({ message: "OK" });
});

router.get("/protected", MiddlewareAuth, (request, response) => {
  return response
    .status(200)
    .json({ message: "Protected route accessed successfully" });
});

// Auth routes
router.post("/signin", (request, response) => {
  return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
  return authenticateController.handle(request, response);
});

router.post("/refresh", (request, response) => {
  return refreshTokenUserController.handle(request, response);
});

// Expense routes

router.post("/expense", MiddlewareAuth, (request, response) => {
  return createExpenseController.handle(request, response);
});

router.get("/expense", MiddlewareAuth, (request, response) => {
  return listExpenseController.handle(request, response);
});

router.put("/expense/:id", MiddlewareAuth, (request, response) => {
  return updateExpenseController.handle(request, response);
});

router.delete("/expense/:id", MiddlewareAuth, (request, response) => {
  return deleteExpenseController.handle(request, response);
});

export { router };
