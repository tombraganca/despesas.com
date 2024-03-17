import "express-async-error";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/config";
import SwaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { PrismaClient } from "@prisma/client";
import path from "path";
import swaggerDocs from "./swagger.json";
import { indexTemplete } from "./public/templete";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

app.get("/", (_req: Request, res: Response) => {
  res.send(indexTemplete);
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});
