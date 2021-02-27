import SurveyUser from "../models/SurveyUser";
import surveyView from "./surveyView";
import userView from "./userView";

const surveyUserView = {
    render(surveyUserItem: SurveyUser){
        const {id, value, survey_id, user_id, user= null, survey= null } = surveyUserItem;
        return{
            id: id,
            value: value,
            survey_id: survey_id, 
            user_id: user_id,
            user: user? userView.render(user) : user,
            survey: survey? surveyView.render(survey): survey
        }
    }
}

export default surveyUserView;