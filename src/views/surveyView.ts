import Survey from "../models/Survey";

const surveyView = {
    render(survey: Survey) {
        return {
            id: survey.id,
            title: survey.title,
            description: survey.description
        }
    },

    renderMany(surveys: Survey[]) {
        return surveys.map(survey => this.render(survey))
    }
};

export default surveyView;