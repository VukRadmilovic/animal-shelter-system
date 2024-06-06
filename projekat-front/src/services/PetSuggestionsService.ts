import axios from "axios";
import {QuestionResponse} from "../models/QuestionResponse.ts";
import {Suggestions} from "../models/Suggestions.ts";

export class PetSuggestionsService {
    private api_host = "http://localhost:8080";
    public sendResponse(response : QuestionResponse): Promise<void> {
        return axios({
            method: 'POST',
            url: `${this.api_host}/api/suggestion`,
            data: response
        }).then(() => {}).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public getSuggestions(lastResponse: QuestionResponse): Promise<Suggestions> {
        return axios({
            method: 'POST',
            url: `${this.api_host}/api/suggestions/get`,
            data: lastResponse
        }).then((suggestions) => suggestions.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}