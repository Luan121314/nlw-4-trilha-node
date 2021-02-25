import {Request, Response, Router} from 'express'
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
route.post("/sendMail", SendMailController.execute)


export default route;