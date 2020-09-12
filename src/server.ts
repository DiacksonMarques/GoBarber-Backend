import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import './database/index';
import uploadConfig from './config/upload';
import AppError from './erros/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        // eslint-disable-next-line no-console
        console.error(error);

        return response.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('✔ Server started on port 3333');
});
