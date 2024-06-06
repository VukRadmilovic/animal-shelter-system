import {Answer} from "./Answer.ts";

export interface Question {
    number: number,
    text: string,
    answers: Answer[]
}