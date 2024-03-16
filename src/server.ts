import 'express-async-error';
import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { config } from './config/config';
import SwaggerUi from 'swagger-ui-express';

import { router } from './routes';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import swaggerDocs from './swagger.json';

const app: Application = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));

app.use(express.urlencoded({ extended: true }));

app.use(router);


app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port: ${config.PORT}`);
});