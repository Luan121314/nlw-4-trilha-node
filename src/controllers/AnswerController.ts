import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";
import AppError from "../errors/AppError";
import answerView from "../views/answerView";

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if (!surveyUser) {
            throw new AppError("Survey user does not exists")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.status(204).json(answerView.render(surveyUser));
    }
}
export default new AnswerController();