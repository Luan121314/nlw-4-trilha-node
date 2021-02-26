import { Response, Request } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";

/**
 * 
 * Como funciona a equação ?
 * 
    * Notas 12345678910
    * 
    * Detratores = {0, 1, 2, 3, 4, 5, 6}
    * 
    * Passivos = {7,8}
    * 
    * Promotores = {9,8}
    * 
    * Equação (número de promotores - número de detratores)/ número de respondentes x 100;
    * O resultado será uma porcentagem
    */
class NPSController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())

        })

        const detractor = surveyUsers.filter(survey => (
            survey.value >= 0 && survey.value <= 6
        )).length

        const promoters = surveyUsers.filter(survey =>
            survey.value >= 9 && survey.value <= 10
        ).length

        const passive = surveyUsers.filter(survey =>
            survey.value >= 7 && survey.value <= 8
        ).length

        const totalAnswers = surveyUsers.length;

        const calculate = Number(((promoters - detractor) / totalAnswers) * 100).toFixed(2)

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers: totalAnswers,
            nps: calculate
        })
    }
}
export default new NPSController()