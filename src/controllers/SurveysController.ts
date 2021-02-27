import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';
import * as yup from 'yup';
import AppError from '../errors/AppError';

class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        })

        await surveysRepository.save(survey);

        return response.status(201).json(survey)
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);
        const allSurveys = await surveysRepository.find();
        return response.json(allSurveys)

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

        const surveyRepository = getCustomRepository(SurveysRepository);
        const isSurveyExists = await surveyRepository.findOne({ id });

        if (!isSurveyExists) {
            throw new AppError("Survey not exists");
        }

        await surveyRepository.delete({ id })
        return response.sendStatus(204);
    }
    async update(request: Request, response: Response) {

        const { id } = request.params;
        const {title, description} = request.body
        const schema = yup.object().shape({
            id: yup.string().uuid().required(),
            title: yup.string().required(),
            description: yup.string().required()
        })
        try {
            await schema.validate({id, title, description})
        } catch (error) {
            throw new AppError(error)
        }

        const surveyRepository = getCustomRepository(SurveysRepository);
        const isSurveyExists = await surveyRepository.findOne({ id });

        if (!isSurveyExists) {
            throw new AppError("Survey not exists");
        }

        await surveyRepository.save({ id , title, description})
        return response.sendStatus(204);
    }
}

export default new SurveysController();