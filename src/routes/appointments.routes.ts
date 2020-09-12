/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppoitmentService from '../services/CreateAppoitmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// eslint-disable-next-line no-shadow
appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository =  getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

// eslint-disable-next-line no-shadow
appointmentsRouter.post('/', async (request, response) => {

        // eslint-disable-next-line camelcase
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoitment = new CreateAppoitmentService();

        const appointment = await createAppoitment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
});

export default appointmentsRouter;
