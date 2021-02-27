import SurveyUser from "../../models/SurveyUser";

const answerView = {
    render(value: SurveyUser){
        return{
            id: value.id,
            value: value.value
        }
    }
}
export default answerView;