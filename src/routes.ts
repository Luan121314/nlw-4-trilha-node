import {Request, Response, Router} from 'express'
import AnswerController from './controllers/AnswerController';
import NPSController from './controllers/NPSController';
import SendMailController from './controllers/SendMailController';
import SurveysController from './controllers/SurveysController';
import UserController from './controllers/UserController';


const route = Router();


route.get("/users", (request:Request, response:Response)=>{
    return response.send("Hello nlw")
})
route.post("/users", UserController.create)
route.post("/surveys", SurveysController.create)
route.get("/surveys", SurveysController.show)
route.post("/sendMail", SendMailController.execute);
route.get("/answers/:value", AnswerController.execute);
route.get("/nps/:survey_id", NPSController.execute);


export default route;