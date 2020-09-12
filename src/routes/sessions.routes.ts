/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Router } from 'express';

import AutheticateUserService from '../services/AutheticateUserService';

const sessionsRouter = Router();


// eslint-disable-next-line no-shadow
sessionsRouter.post('/', async (request, response) => {

        const { email, password } = request.body;

        const autheticateUser = new AutheticateUserService();

        const { user, token} =await autheticateUser.execute({
            email,
            password,
        })

        delete user.password;

        return response.json({ user, token });

});

export default sessionsRouter;
