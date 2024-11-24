import axios from "axios";
import { UsersQuestionResponse } from "../models/questionnaire.ts";
import { Suggestions } from "../models/questionnaire.ts";
import { Questionnaire } from "../models/questionnaire.ts";

export class PetSuggestionsService {
  private api_host = "http://localhost:8080";

  public getQuestions(): Promise<Questionnaire> {
    console.log("trigger");
    return axios({
      method: "GET",
      url: `${this.api_host}/api/questionnaire/questions`,
    })
      .then((questionnaire) => questionnaire.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  public sendResponse(response: UsersQuestionResponse): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/questionnaire/response`,
      data: response,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getSuggestions(userId: string): Promise<Suggestions> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/questionnaire/suggestions/` + userId,
    })
      .then((suggestions) => suggestions.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
