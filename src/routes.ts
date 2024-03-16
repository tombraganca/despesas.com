import { Router } from "express";
import { createUserController } from "./services/auth/create-user";
import { authenticateController } from "./services/auth/authenticate-user";
import { refreshTokenUserController } from "./services/auth/refresh-token-user";
import { MiddlewareAuth } from "./middleware/MiddlewareAuth";


const router = Router();

router.post("/signin", (request, response) => {
    return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
    return authenticateController.handle(request, response);
});

router.post("/refresh", (request, response) => {
    return refreshTokenUserController.handle(request, response);
});

router.get('/health', (request, response) => {
    return response.status(309).json({ message: "OK" })
});


export { router };

