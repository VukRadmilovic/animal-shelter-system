import {Answer} from "./Answer.ts";

export interface Question {
    number: number,
    answers: Answer[]
}