import {Router} from 'express'
import AnswerController from './controllers/AnswerController';
import NPSController from './controllers/NPSController';
import SendMailController from './controllers/SendMailController';
import SurveysController from './controllers/SurveysController';
import UserController from './controllers/UserController';


const route = Router();

//Users routes
route.get("/users", UserController.index);
route.post("/users", UserController.create);
route.delete("/users/:id", UserController.delete);

//Surveys routes
route.post("/surveys", SurveysController.create);
route.get("/surveys", SurveysController.show);
route.put("/surveys/:id", SurveysController.update);
route.delete("/surveys/:id", SurveysController.delete);

//others routes
route.post("/sendMail", SendMailController.execute);
route.get("/answers/:value", AnswerController.execute);

//NPS query
route.get("/nps/:survey_id", NPSController.execute);


export default route;