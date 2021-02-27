import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import * as yup from 'yup';
import AppError from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })
        try {
            await schema.validate(request.body, {
                abortEarly: false
            })
        } catch (error) {
            throw new AppError(error)

        }


        const userRepository = getCustomRepository(UserRepository);
        const userAlreadyExists = await userRepository.findOne({
            email
        })
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }
        const user = userRepository.create({
            name, email
        })
        await userRepository.save(user)
        return response.status(201).json(user)
    }
    async index(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find();
        return response.json(users);
    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const schema = yup.object().shape({
            id: yup.string().uuid().required()
        })
        try {
            await schema.validate(request.params)
        } catch (error) {
            throw new AppError(error)
        }

        const userRepository = getCustomRepository(UserRepository);
        const isUserExists = await userRepository.findOne({ id });

        if (!isUserExists) {
            throw new AppError("User not exists");
        }

        await userRepository.delete({ id })
        return response.sendStatus(204);
    }
}

export default new UserController()