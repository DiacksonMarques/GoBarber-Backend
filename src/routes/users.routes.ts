/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpadateUserAvatarService';

import uploadConfig from '../config/upload';
import ensureAutheticated  from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);

// eslint-disable-next-line no-shadow
usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password} = request.body;

        const createUserService = new  CreateUserService();

        const user = await createUserService.execute({name, email, password});

        delete user.password;

        return response.json(user);
    }catch(error){
        return response.status(400).json({ error: error.message });
    }
});

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), async( request, response) => {
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);
})
export default usersRouter;
