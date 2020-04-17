import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import pt from 'date-fns/locale/pt';
import Queue from '../../lib/Queue';
import CacellationMail from '../jobs/CancellationMail';

import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';

import * as Yup from 'yup';


class AppointmentController { 

    async index(req, res) {
        const { page = 1 } = req.query; 

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }
            ]
        });

        return res.json(appointments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required(),
        });  
        
        if (!(await schema.isValid(req.body))) {
            return res.json({ error: 'Validation fails!'}); 
        }

        const { provider_id, date } = req.body;

        const isProvider = await User.findOne({ 
            where: { id: provider_id, provider: true },
        });

        if(!isProvider) {
            return res.status(401).json({ error: 'Erro usuário informado não é um prestador de serviço ou nao existe!'});
        }

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Data inválida! Escolha uma data válida!'})
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if(checkAvailability) {
            return res.status(400).json({ error: 'Horário indisponível! Tente outro horário!'});
        }


        if(req.userId == provider_id) {
            return res.status(401).json({ error: 'Você não pode criar um agendamento com você mesmo!'});
        }

        const appointment = await Appointment.create({ 
            user_id: req.userId,
            provider_id,
            date,

        });

        const user = await User.findByPk(req.userId);

        const formatedDate = format(hourStart, "'dia' dd 'de' MMMM', às ' H:mm'h'", { locale: pt });

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formatedDate}`,
            user: provider_id,

        });

        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                }
                
            ],
        });

        if(appointment.user_id !== req.userId) {
            return res.status(401).json({ error: 'Você não tem permissão para cancelar este agendamento!'});
        }

        const dateWithSub = subHours(appointment.date, 2);

        if(isBefore(dateWithSub, new Date())) {
            return res.status(401).json({ error: 'Você só pode cancelar um agendamento até 2hrs antes!'});
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        await Queue.add(CacellationMail.key, {
            appointment,
        });

       

        return res.json(appointment);

    }

}
export default new AppointmentController();